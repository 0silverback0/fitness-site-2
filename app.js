$(document).ready(function() {
    $('form').submit(function(event) {
      event.preventDefault();
      var weight = $('#weight').val();
      var height = $('#height').val();
      var age = $('#age').val();
      var gender = $('#gender').val();
      var activity = $('#activity').val();
      var restingHeartRate = parseInt($('#resting-heart-rate').val());
      
      // calculate calorie needs here
      var calorieNeeds = 0;
      if (gender == 'male') {
        calorieNeeds = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else if (gender == 'female') {
        calorieNeeds = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      
      if (activity == 'sedentary') {
        calorieNeeds *= 1.2;
      } else if (activity == 'lightly-active') {
        calorieNeeds *= 1.375;
      } else if (activity == 'moderately-active') {
        calorieNeeds *= 1.55;
      } else if (activity == 'very-active') {
        calorieNeeds *= 1.725;
      } else if (activity == 'super-active') {
        calorieNeeds *= 1.9;
      }
      
      $('#result').html('<p>Your daily calorie needs are: ' + calorieNeeds.toFixed(2) + '</p>');
      
      // calculate target heart rate range here
      var maxHeartRate = 220 - age;
      var targetHeartRateLow = Math.round(0.5 * (maxHeartRate - restingHeartRate) + restingHeartRate);
      var targetHeartRateHigh = Math.round(0.85 * (maxHeartRate - restingHeartRate) + restingHeartRate);
      
      $('#result').append('<p>Your target heart rate range is: ' + targetHeartRateLow + ' - ' + targetHeartRateHigh + ' beats per minute</p>');
    });
  });


  // SHOW HIDE CALORIE CALCULATOR

  document.addEventListener("DOMContentLoaded", function() {
    var savedEmail = localStorage.getItem("userEmail");
    if (savedEmail !== null) {
      document.getElementById("email-form").style.display = "none";
      document.getElementById("calorie-form").style.display = "block";
    } else {
      document.getElementById("email-form").style.display = "block";
      document.getElementById("calorie-form").style.display = "none";
    }
  });
  
  document.getElementById("submit-email").addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var emailRegex = /\S+@\S+\.\S+/;
  
    if (emailRegex.test(email)) {
      localStorage.setItem("userEmail", email);
      document.getElementById("email-form").style.display = "none";
      document.getElementById("calorie-form").style.display = "block";
    } else {
      alert("Please enter a valid email address.");
    }
  });
  
  