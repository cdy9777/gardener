import csv
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from search.models import Plant

CSV_PATH ='식물백과사전.csv'

with open(CSV_PATH, newline='') as csvfile:
    data_reader = csv.DictReader(csvfile)
    for row in data_reader:
        print(row)
        Plant.objects.get_or_create(
            name = row["name"],
            photo_url = row["photo_url"],
            growth_form = row["growth_form"],
            care_difficulty = row["care_difficulty"],
            management_level = row["management_level"],
            water_period_spring = row["water_period_spring"],
            water_period_summer = row["water_period_summer"],
            water_period_autumn = row["water_period_autumn"],
            water_period_winter = row["water_period_winter"],
            growth_temp =row["growth_temp"],
            sunlight = row["sunlight"],
            humidity = row["humidity"],
            flower = row["flower"],
            content = row["content"],
        )


