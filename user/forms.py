from django.core.exceptions import ValidationError
from .models import GeneralUser, UserManager
from django import forms
from django.contrib.auth.forms import UserChangeForm, AuthenticationForm, UsernameField, UserCreationForm
from django.contrib.auth import get_user_model, authenticate
from allauth.account.forms import SignupForm


class UserAuthenticationForm(AuthenticationForm):
    username = UsernameField(widget=forms.TextInput(
        attrs={'autofocus': True, 'class': 'form-control', 'placeholder': '아이디'}))
    password = forms.CharField(
        label=("Password"),
        strip=False,
        widget=forms.PasswordInput(
            attrs={'autocomplete': 'current-password', 'class': 'form-control', 'placeholder': '비밀번호'}),
    )

    def clean_password(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username is not None and password:
            if authenticate(self.request, username=username, password=password) is None:
                raise ValidationError('아이디와 비밀번호가 일치하지 않습니다!')
            return password


class CustomUserCreationForm(UserCreationForm):
    # 사용자 생성 폼
    name = forms.CharField(
        label=('name'),
        required=True,
        widget=forms.TextInput(
            attrs={'class': 'signup-form-control'}
        )
    )
    email = forms.EmailField(
        label=('Email'),
        required=True,
        widget=forms.EmailInput(
            attrs={'class': 'signup-form-control'}
        )
    )
    userid = forms.CharField(
        label=('userid'),
        widget=forms.TextInput(
            attrs={'class': 'signup-form-control'})
    )

    class Meta:
        model = GeneralUser
        fields = ('name', 'email', 'userid',)

    def clean_password2(self):
        # 두 비밀번호 입력 일치 확인
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("비밀번호가 일치하지 않습니다.")
        return password2

    def clean_email(self):
        if GeneralUser.objects.filter(email=self.cleaned_data['email']).exists():
            raise forms.ValidationError('이미 존재하는 이메일입니다.')
        return self.cleaned_data['email']

    def clean_userid(self):
        if GeneralUser.objects.filter(userid=self.cleaned_data['userid']).exists():
            raise forms.ValidationError('이미 존재하는 아이디입니다.')
        return self.cleaned_data['userid']

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        user.email = UserManager.normalize_email(self.cleaned_data['email'])
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user


class CustomUserChangeForm(UserChangeForm):
    userid = forms.CharField(
        label=('Userid'),
        widget=forms.TextInput(
            attrs={'class': 'update-form-control'}

        )
    )
    email = forms.EmailField(
        label=('Email'),
        widget=forms.EmailInput(
            attrs={'class': 'update-form-control'}

        )
    )
    password1 = forms.CharField(
        label=('Password'),
        widget=forms.PasswordInput(
            attrs={'class': 'update-form-control'}

        )
    )
    password2 = forms.CharField(
        label=('Password confirmation'),
        widget=forms.PasswordInput(
            attrs={'class': 'update-form-control'}

        )
    )

    class Meta:
        model = get_user_model()
        fields = ['userid', 'email', 'password']

    def clean_password2(self):
        # 두 비밀번호 입력 일치 확인
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("비밀번호가 일치하지 않습니다.")
        return password2

    # def clean_email(self):
    #     if GeneralUser.objects.filter(email=self.cleaned_data['email']).exists():
    #         raise forms.ValidationError('이미 존재하는 이메일입니다.')
    #     return self.cleaned_data['email']

    # def clean_userid(self):
    #     if GeneralUser.objects.filter(userid=self.cleaned_data['userid']).exists():
    #         raise forms.ValidationError('이미 존재하는 아이디입니다.')
    #     return self.cleaned_data['userid']


class UserProfileChangeForm(UserChangeForm):

    class Meta:
        model = get_user_model()
        fields = ['Image', 'name', 'profile']


class MyCustomSignupForm(SignupForm):
    agree_terms = forms.BooleanField(label='서비스 이용약관 및 개인정보방침 동의')
    agree_marketing = forms.BooleanField(label='마케팅 이용 동의')

    def save(self, request):
        user = super(MyCustomSignupForm, self).save(request)
        user.agree_terms = self.cleaned_data['agree_terms']
        user.agree_marketing = self.cleaned_data['agree_marketing']
        user.save()
        return user


class UserIdfindForm(forms.ModelForm):
    email = forms.EmailField(
        label=('Email'),
        widget=forms.EmailInput(
            attrs={'class': 'update-form-control'}

        )
    )

    class Meta:
        model = GeneralUser
        fields = ['email']
