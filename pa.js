/*
Valters Kalnins vk23053
 */
 
window.addEventListener('DOMContentLoaded', (event) => { // execute the code when the initial HTML document has been completely loaded, we need the regions select to be loaded 
    
	var likeTypingButton = document.getElementById("like-typing");

	var timesLiked = 0;

    likeTypingButton.addEventListener("click", function() {
		timesLiked++;
		var temp = document.createElement("h4");
		temp.id="liked-list-element";
		
		if(document.getElementById("liked-list-element"))
			document.getElementById("liked-list-element").remove();
		
		var newText = "You have liked typing "+timesLiked+" times";
		
		var node = document.createTextNode(newText);
		
		temp.appendChild(node);
		
		document.getElementById("liked-list").appendChild(temp);
		
    });
	
	var selectElement = $('#text-select');

	for(let i in quotes)
		$('#text-select').append($('<option>', {text: quotes[i].quoteName}));
	
	function updateText()
	{
		var selectElement = document.getElementById("text-select");
		var selectedIndex = selectElement.selectedIndex;
		var textElement = document.getElementById("text");
		textElement.innerHTML=quotes[selectedIndex].quote;
		var imageLink = quotes[selectedIndex].imageLink;
		var imageCode = '<img id="resource-image" src="'+ imageLink +'">';
		var resourceName = quotes[selectedIndex].resourceName;
		var resourceNameCode = '<div class="resource-title">'+resourceName+'</div>';
		var author = quotes[selectedIndex].author;
		var authorCode = '<div class="author">'+author+'</div>';
		var newCode = resourceNameCode+authorCode+imageCode;
		var reference = document.getElementById("reference");
		reference.innerHTML = newCode;
		$("#text-input").removeClass("red-background");
		$("#text-input").addClass("default-background");
    }
	
	updateText();
	
	var currentTextIndex = 0;
	var startTime = -1, finishTime = -1;
	var hasWon = false;
	
	$('#text-select').on('change', function()
	{
		updateText();
		currentTextIndex = 0;
		startTime = -1;
		finishTime = -1;
		hasWon=false;
		$("#text-input").val("");
		$('.finish').hide();
	});

	function finish()
	{
		hasWon=true;
		$('.finish').show();
		var timeInSeconds = (finishTime-startTime)/1000;
		var timeInMinutes = timeInSeconds/60;
		var charactersTyped = $('#text').text().length;
		var wordsTyped = charactersTyped/5;//this is universally accepted
		var wpm = Math.round(wordsTyped/timeInMinutes);
		$('#wpm').text(wpm);
		$('#score').val(wpm);
		var chosenIndex = $('#text-select').prop("selectedIndex");
		var quoteName = quotes[chosenIndex].quoteName;
		$('#chosen-text').val(quoteName);
    }

	$('#text-input').on('input', function()
	{
		if(hasWon)
			return;
		var currentText =  $('#text').text();
		var writtenText = $('#text-input').val();
		var newWrittenTextSize = currentTextIndex+writtenText.length;
		var minimalSize = Math.min(newWrittenTextSize,currentText.length);
		if(startTime==-1)
			startTime = new Date();
		finishTime = new Date();
		if(newWrittenTextSize>currentText.length)
			return;
		var isCorrect = true;
		for(var i = 0;i<writtenText.length;i++)
			if(currentText[currentTextIndex+i]!=writtenText[i])
				isCorrect = false;
		$("#text-input").removeClass("default-background");
		$("#text-input").removeClass("red-background");
		if(isCorrect)
		{
			$("#text-input").addClass("default-background");
			var victory = (newWrittenTextSize==currentText.length);
			if(victory||currentText[newWrittenTextSize-1]==' ')
			{
				currentTextIndex+=writtenText.length;
				var newText = '<span class="green-text"><strong>' + 
						currentText.substring(0,currentTextIndex) +'</strong></span>' +
						currentText.substring(currentTextIndex);
				$("#text").html(newText);
				$("#text-input").val("");
			}
			if(victory)
				finish();
		}
		else
			$("#text-input").addClass("red-background");
	});
	
	
	
	
});

function validateForm() {
	var nickname = document.getElementById("nickname").value;
	var score = document.getElementById("score").value;
	var chosenText = document.getElementById("chosen-text").value;
	var birthYear = document.getElementById("birth-year").value;

	if (nickname.trim() === "") {
		alert("Please enter a nickname.");
		return false;
	}

	if (birthYear.trim() === "") {
		alert("Please enter a birth year.");
		return false;
	}
	
	if (isNaN(Number(birthYear))) {
		alert("Please enter a valid birth year.");
		return false;
	}

	if (!Number.isInteger(parseFloat(birthYear))) {
		alert("Please enter a whole year!");
		return false;
	}

	if (parseInt(birthYear)<0) {
		alert("Please enter a positive birth year.");
		return false;
	}

	var currentYear = new Date().getFullYear();

	if(parseInt(birthYear)<currentYear-150){
		alert("You are not that old!");
		return false;
	}

	if(parseInt(birthYear)>currentYear){
		alert("You cannot be born in the future!");
		return false;
	}

	return true;
}