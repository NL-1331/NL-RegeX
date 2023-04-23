$(document).ready(function() {
  $('#regex-form').submit(function(event) {
    event.preventDefault();
    var regex = $('#regex-input').val();
    if (!regex) {
      var alertMessage = '<div class="alert alert-danger" role="alert">The field cannot be empty, please enter some regular expression.</div>';
      $('.result').html(alertMessage);
      return;
    }
    $.getJSON('keywords.json', function(data) {
      var keywords = data.keywords;
      var matchedKeyword = null;
      for (var i = 0; i < keywords.length; i++) {
        var keyword = keywords[i];
        var re = new RegExp(regex);
        if (re.test(keyword.word)) {
          matchedKeyword = keyword;
          break;
        }
      }
      if (matchedKeyword) {
        var alertMessage = '<div class="alert alert-success" role="alert">' + matchedKeyword.word + '</div>';
        $('.result').html(alertMessage);
      } else {
        var alertMessage = '<div class="alert alert-danger" role="alert">No keywords found</div>';
        $('.result').html(alertMessage);
      }
    });
  });
});

    