
from django.urls import path
from chatapp.views import upload_files,question_answering,home

urlpatterns = [
    path('',home),
    path('upload-pdf', upload_files),
    path("question-answering",question_answering),
]
