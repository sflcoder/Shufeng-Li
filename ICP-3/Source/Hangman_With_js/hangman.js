
var Hangman = (function () {
    
    'use strict';
    function Hangman(elId) {
        // Dom is ready
        this.elId       = elId;
        this.words      = ['PROGRAMMER', 'BRAINSTORM', 'CREATIVE', 'PROGRAMMER', 'CULTURE', 'RAZORSHARP', 'SCREWDRIVER', 'TYPEWRITER'];
    }

    Hangman.prototype.reset = function () {
        
        // Reset variables
        this.STOPPED        = false;
        this.MISTAKES       = 0;
        this.GUESSES        = [];
        this.WORD           = this.words[Math.floor(Math.random() * this.words.length)];
        
        // Reset Elements
        this.hideElementByClass('h');
        $("#btn-hint").show();
        $('body').css('background-image', "none");
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
    };


    Hangman.prototype.hint = function ( ) {
        $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
            {
                tags: this.WORD,
                tagmode: "any",
                format: "json"
            },
            function(data) {
                //var newHint = Math.floor(Math.ceil(Math.random()*100));
                var rnd = Math.floor(Math.random() * data.items.length);
                var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
                $('body').css('background-image', "url('" + image_src + "')");
            });

    }
    Hangman.prototype.guess = function (guess) {

        // Uppercase the guessed letter
        guess = guess.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(guess) > -1) {
            // Game stopped or allready guessed on that letter
            return;
        }

        // Add the letter to array GUESSES
        this.GUESSES.push(guess);
        // Update the word hint
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedfWord());
        // Update the guessed letter list
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(guess) < 0) {
            
            // Incorrect guess
            this.MISTAKES++;
            
            // Show next part of hangman character
            this.showElementByIdWithContent(this.elId + "_" + this.MISTAKES, null);

            if (this.MISTAKES === 6) {
                // Game Over
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD);
                this.STOPPED = true;
                return;
            }
            
        } else if (this.WORD.indexOf(this.getGuessedfWord()) !== -1) {
            // Victory
            this.showElementByIdWithContent(this.elId + "_end", "You made it!<br/>The word was: " + this.WORD);
            this.STOPPED = true;
            return;
        }

    };
    
    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };
    
    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedfWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            // Word characters
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                    this.WORD[i] : "_";
        }
        return result;
    };
    
    return new Hangman('hangm');
    
}());