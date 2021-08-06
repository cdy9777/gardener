from django.shortcuts import render, get_object_or_404, redirect
from .models import CommunityAnswer, CommunityQuestion
from .forms import QuestionForm, AnswerForm
from account.models import GeneralUser
from django.views.generic import ListView
from django.contrib.auth.decorators import login_required
# Create your views here.


def qna_list(request):
    question_list = CommunityQuestion.objects.all().order_by('updated_at')
    ctx = {'question_list': question_list}
    return render(request, 'QnA/qnalist.html', ctx)


class TaggedObjectLV(ListView):
    template_name = 'taggit/taggit_post_list.html'
    model = CommunityQuestion

    def get_queryset(self):
        return CommunityQuestion.objects.filter(tags__name=self.kwargs.get('tag'))

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tagname'] = self.kwargs['tag']
        return context


def question_detail(request, pk):
    question = get_object_or_404(CommunityQuestion, pk=pk)
    answer = question.communityanswer_set.all()
    ctx = {'question': question, 'answer': answer}
    return render(request, 'QnA/questiondetail.html', ctx)


@login_required
def make_question(request, question=None):
    if request.method == "POST":
        form = QuestionForm(request.POST, request.FILES, instance=question)
        if form.is_valid():
            question = form.save()
            return redirect('QnA:questiondetail', pk=question.pk)
    else:
        user_id = GeneralUser.objects.get(
            userid=request.user.get_username())
        form = QuestionForm(instance=question, initial={
                            'user_id': user_id})
        ctx = {'form': form}
    return render(request, 'QnA/makequestion.html', ctx)


@login_required
def edit_question(request, pk):
    question = get_object_or_404(CommunityQuestion, pk=pk)
    return make_question(request, question=question)


@login_required
def delete_question(request, pk):
    question = CommunityQuestion.objects.get(pk=pk)
    question.delete()
    return redirect('QnA:qnalist')


@login_required
def make_answer(request, pk, answer=None):
    if request.method == "POST":
        form = AnswerForm(request.POST, request.FILES, instance=answer)
        if form.is_valid():
            answer = form.save()
            pk = answer.question.pk

            return redirect('QnA:questiondetail', pk=pk)
    else:
        # user_id = GeneralUser.objects.get(
        #     userid=request.user.get_username())
        # question = CommunityQuestion.objects.get(pk=pk)
        form = AnswerForm(instance=answer)
        ctx = {'form': form}
    return render(request, 'QnA/makeanswer.html', ctx)


@login_required
def edit_answer(request, pk):
    answer = get_object_or_404(CommunityAnswer, pk=pk)
    return make_answer(request, question=answer)


@login_required
def delete_answer(request, pk):
    answer = CommunityAnswer.objects.get(pk=pk)
    pk = answer.communityquestion.pk
    answer.delete()
    return redirect('QnA:question_detail', pk=pk)
