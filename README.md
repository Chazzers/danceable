# Danceable?!

![image](https://user-images.githubusercontent.com/33430669/109641712-521b7d00-7b52-11eb-8d33-a11b4943df2f.png)

Welcome to the Danceable?! webapp. This webapp will score the danceability of your spotify playlist!

## Spotify API

This app makes use of the spotify api through the use of the "(implicit grant flow)[https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow]". To make use of this flow you will need an api key (client id) from spotify. With the spotify api you can get user data once they have given permission to do so. You can also use the api to look for songs, playlists, artists and a lot more. Another cool feature of the api is that you can analyse song data. 

### How it works

First all your playlists and it's data will get fetched from the spotify api.

![image](https://user-images.githubusercontent.com/33430669/109640429-c2c19a00-7b50-11eb-9187-2acb91a2d15a.png)

Then all the songs' audio features data of the playlist gets fetched.

![image](https://user-images.githubusercontent.com/33430669/109640497-da991e00-7b50-11eb-8f97-f883c83e5a07.png)

Afterwards the score will be generated based on the data fetched from the songs' audio-features data.

## Actor diagram

![actor-diagram](https://user-images.githubusercontent.com/33430669/109317151-b5549900-784c-11eb-9861-d144adc81e64.jpg)

## Interaction diagram

![interaction-diagram](https://user-images.githubusercontent.com/33430669/109317195-c00f2e00-784c-11eb-8ebe-d3f320884aff.jpg)

## Resources

[https://github.com/thecreazy/create-a-modern-javascript-router](Router project)
[https://www.hackdoor.io/articles/create-modern-javascript-router-ff919b1cbb08](Router article)
