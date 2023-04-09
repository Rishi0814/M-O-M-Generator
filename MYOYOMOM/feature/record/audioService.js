globalFromAudioTranscript = "";

chrome.tabCapture.capture({audio: true}, function(stream) {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    var source = audioCtx.createMediaStreamSource(stream);
    
    var gainNode = audioCtx.createGain();
    gainNode.gain.value = 1;
    
    source.connect(gainNode);
    
    var dest = audioCtx.createMediaStreamDestination();
    
    gainNode.connect(dest);
    
    var audio = document.createElement('audio');
    audio.src = window.URL.createObjectURL(dest.stream);
  });

  
if (!('webkitSpeechRecognition' in window)) {
    console.log('Speech recognition is not supported.');
  } else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
  
    chrome.browserAction.onClicked.addListener(function(tab) {
      recognition.start();
    });
  
    recognition.onresult = function(event) {
      var interimTranscript = '';
      var finalTranscript = '';
  
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      global_transcript == finalTranscript;
    };
  
    recognition.onerror = function(event) {
      console.log('Error occurred in recognition: ' + event.error);
    };
    
  }
  