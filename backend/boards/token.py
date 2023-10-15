from users.models import User
from rest_framework.authtoken.models import Token

# Replace 'your_username' with the username of the user for whom you want to create a token.
user = User.objects.get(username='mike')

# Create or retrieve the token for the user.
token, created = Token.objects.get_or_create(user=user)

# Print the token key.
print(token.key)
