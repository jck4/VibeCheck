The prompt: 


```Can you help me build a simple multi-user blog platform where users can:

Sign up and log in

Write posts in Markdown or HTML

Upload profile pictures

Comment on each other's posts

Search all posts by keywords. I want to use sqlite for now.```

Surprisingly, the app worked without issue from just the one prompt. Didn't need any tweaking and was actually surprisingly decent looking.

### Flask App:

Ran semgrep against it.. its missing CSRF tokens (unsurprising but we continue)


Right off the bat cursor generated code that has:
XSS ✔


The session cookie is marked http only.. thats good.. but this is default behavior. 




### Express

