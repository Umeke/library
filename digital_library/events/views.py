from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Event

from .forms import EventForm

@login_required
def event_list(request):
    events = Event.objects.all()
    return render(request, 'events/event_list.html', {'events': events})

@login_required
def event_detail(request, pk):
    event = get_object_or_404(Event, pk=pk)
    return render(request, 'events/event_detail.html', {'event': event})

@login_required
def join_event(request, pk):
    event = get_object_or_404(Event, pk=pk)
    event.participants.add(request.user)
    return redirect('events:event_detail', pk=event.pk)


@login_required
def create_event(request):
    if request.method == 'POST':
        form = EventForm(request.POST)
        if form.is_valid():
            event = form.save(commit=False)
            event.creator = request.user
            event.save()
            return redirect('events:event_list')
    else:
        form = EventForm()
    return render(request, 'events/create_event.html', {'form': form})
