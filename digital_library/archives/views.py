from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import DigitalArchive
from .forms import ArchiveForm  # You need to create this form


@login_required
def archive_list(request):
    query = request.GET.get('q')
    if query:
        archives = DigitalArchive.objects.filter(title__icontains=query)
    else:
        archives = DigitalArchive.objects.all()

    return render(request, 'archives/archive_list.html', {'archives': archives})


@login_required
def archive_detail(request, pk):
    archive = get_object_or_404(DigitalArchive, pk=pk)
    return render(request, 'archives/archive_detail.html', {'archive': archive})


@login_required
def archive_create(request):
    if request.method == 'POST':
        form = ArchiveForm(request.POST, request.FILES)
        if form.is_valid():
            archive = form.save(commit=False)
            archive.uploaded_by = request.user
            archive.save()
            return redirect('archives:archive_list')
    else:
        form = ArchiveForm()
    return render(request, 'archives/archive_create.html', {'form': form})


@login_required
def archive_update(request, pk):
    archive = get_object_or_404(DigitalArchive, pk=pk)
    if request.method == 'POST':
        form = ArchiveForm(request.POST, request.FILES, instance=archive)
        if form.is_valid():
            form.save()
            return redirect('archives:archive_detail', pk=archive.pk)
    else:
        form = ArchiveForm(instance=archive)
    return render(request, 'archives/archive_create.html', {'form': form})


@login_required
def archive_delete(request, pk):
    archive = get_object_or_404(DigitalArchive, pk=pk)
    if request.method == 'POST':
        archive.delete()
        return redirect('archive_list')
    return render(request, 'archives/archive_confirm_delete.html', {'archive': archive})
