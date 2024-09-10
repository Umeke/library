from django.http import HttpResponseForbidden
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required

from .forms import ClubPostForm, ClubForm
from .models import Club, ClubPost, ClubMembershipRequest


@login_required
def club_list(request):
    clubs = Club.objects.all()

    club_status = []
    for club in clubs:
        is_member = request.user in club.members.all()
        membership_request = ClubMembershipRequest.objects.filter(club=club, user=request.user,
                                                                  status='pending').exists()
        club_status.append({
            'club': club,
            'is_member': is_member,
            'membership_requested': membership_request
        })

    return render(request, 'clubs/club_list.html', {'club_status': club_status})


@login_required
def club_detail(request, club_id):
    club = get_object_or_404(Club, id=club_id)

    # Check if the user is a member of the club
    if request.user not in club.members.all():
        return render(request, 'error.html', {
            'message': 'You do not have permission to view this club.'
        })

    posts = club.posts.all()
    return render(request, 'clubs/club_detail.html', {'club': club, 'posts': posts})


# views.py
@login_required
def club_create(request):
    if request.method == 'POST':
        form = ClubForm(request.POST)
        if form.is_valid():
            club = form.save(commit=False)
            club.creator = request.user
            club.save()
            club.members.add(request.user)
            return redirect('clubs:club_detail', club_id=club.id)
    else:
        form = ClubForm()
    return render(request, 'clubs/club_create.html', {'form': form})


@login_required
def club_post_create(request, club_id):
    club = get_object_or_404(Club, id=club_id)

    if request.user not in club.members.all():
        return redirect('clubs:club_detail', club_id=club.id)

    if request.method == 'POST':
        form = ClubPostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.club = club
            post.author = request.user
            post.save()
            return redirect('clubs:club_detail', club_id=club.id)
    else:
        form = ClubPostForm()

    return render(request, 'clubs/club_post_create.html', {'form': form, 'club': club})


@login_required
def request_to_join(request, club_id):
    club = get_object_or_404(Club, id=club_id)

    if request.user in club.members.all():
        return redirect('clubs:club_list')

    # Check if they have already requested
    membership_request = ClubMembershipRequest.objects.filter(club=club, user=request.user, status='pending').exists()

    if not membership_request:
        # Create a membership request
        ClubMembershipRequest.objects.create(club=club, user=request.user)

    return redirect('clubs:club_list')



@login_required
def manage_membership_requests(request, club_id):
    club = get_object_or_404(Club, id=club_id)

    # Only the club creator (admin) can manage membership requests
    if request.user != club.creator:
        return redirect('clubs:club_detail', club_id=club.id)  # Non-admin users can't manage requests

    # Get all pending membership requests for the club
    membership_requests = ClubMembershipRequest.objects.filter(club=club, status='pending')

    if request.method == 'POST':
        request_id = request.POST.get('request_id')
        action = request.POST.get('action')
        membership_request = get_object_or_404(ClubMembershipRequest, id=request_id, club=club)

        if action == 'approve':
            # Approve the request, add user to the club members, and update status
            membership_request.status = 'approved'
            membership_request.save()
            club.members.add(membership_request.user)
        elif action == 'reject':
            # Reject the request and update status
            membership_request.status = 'rejected'
            membership_request.save()

        return redirect('clubs:manage_membership_requests', club_id=club.id)

    return render(request, 'clubs/manage_membership_requests.html', {
        'club': club,
        'membership_requests': membership_requests
    })
