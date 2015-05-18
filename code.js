var loadInterval;
var percentLoaded = 0;
function loadResults(value) {
	loadInterval = setInterval(function() {
		percentLoaded += Math.floor(Math.random() * 5) + 10;
		if (percentLoaded > 100) {
			clearInterval(loadInterval);
			loadInterval = 0;
			window.location.href = stripURLParameters() + "?result=" + value.toString();
			return;
		}
		document.getElementById("message").innerHTML = "Wait... " + percentLoaded.toString() + "%";
	}, 125);
}

function answerAll() {
	for (var i = 0; i < questions.length; i++) {
		var radios = document.getElementsByName("answer" + i.toString());
		radios[0].checked = true;
	}
}

function evaluateAnswers() {
	var value = 0;
	for (var i = 0; i < questions.length; i++) {
		var radios = document.getElementsByName("answer" + i.toString());
		var answered = false;
		for (var j = 0; j < radios.length; j++) {
			if (radios[j].checked) {
				answered = true;
				value += j;
			}
		}
		if (answered == false) {
			document.getElementById("message").innerHTML = "Respond to all questions before submitting!";
			return;
		}
	}
	value = questions.length - value;
	loadResults(value);
}

function submitRating() {
	var radios = document.getElementsByName("rating");
	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			window.location.href = stripURLParameters() + "?rating=" + radios[i].value;
		}
	}
}

function stripURLParameters() {
	var url = window.location.href;
	var end = url.indexOf("?");
	if (end > -1) {
		return window.location.href.substring(0, end);
	}
	else {
		return window.location.href;
	}
}

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

var resultFound = (getURLParameter("result") != null);
var all_questions = ["You are almost never late for your appointments", "You like to be engaged in an active and fast-paced job", "You enjoy having a wide circle of acquaintances", "You feel involved when watching TV soaps", "You are usually the first to react to a sudden event, such as the telephone ringing or unexpected question", "You are more interested in a general idea than in the details of its realization", "You tend to be unbiased even if this might endanger your good relations with people", "Strict observance of the established rules is likely to prevent a good outcome", "It's difficult to get you excited ", "It is in your nature to assume responsibility", "You often think about humankind and its destiny", "You believe the best decision is one that can be easily changed", "Objective criticism is always useful in any activity", "You prefer to act immediately rather than speculate about various options", "You trust reason rather than feelings", "You are inclined to rely more on improvisation than on prior planning", "You spend your leisure time actively socializing with a group of people, attending parties, shopping, etc.", "You usually plan your actions in advance", "Your actions are frequently influenced by your emotions", "You are a person somewhat reserved and distant in communication", "You know how to put every minute of your time to good purpose", "You readily help people while asking nothing in return", "You often contemplate the complexity of life", "After prolonged socializing you feel you need to get away and be alone", "You often do jobs in a hurry", "You easily see the general principle behind specific occurrences", "You frequently and easily express your feelings and emotions", "You find it difficult to speak loudly", "You get bored if you have to read theoretical books", "You tend to sympathize with other people", "You value justice higher than mercy", "You rapidly get involved in the social life of a new workplace", "The more people with whom you speak, the better you feel", "You tend to rely on your experience rather than on theoretical alternatives", "As a rule, you proceed only when you have a clear and detailed plan", "You easily empathize with the concerns of other people", "You often prefer to read a book than go to a party", "You enjoy being at the center of events in which other people are directly involved", "You are more inclined to experiment than to follow familiar approaches", "You avoid being bound by obligations", "You are strongly touched by stories about people's troubles ", "Deadlines seem to you to be of relative, rather than absolute, importance", "You prefer to isolate yourself from outside noises", "It's essential for you to try things with your own hands", "You think that almost everything can be analyzed", "For you, no surprises is better than surprises - bad or good ones", "You take pleasure in putting things in order", "You feel at ease in a crowd", "You have good control over your desires and temptations", "You easily understand new theoretical principles", "The process of searching for a solution is more important to you than the solution itself", "You usually place yourself nearer to the side than in the center of a room", "When solving a problem you would rather follow a familiar approach than seek a new one", "You try to stand firmly by your principles", "A thirst for adventure is close to your heart", "You prefer meeting in small groups over interaction with lots of people", "When considering a situation you pay more attention to the current situation and less to a possible sequence of events", "When solving a problem you consider the rational approach to be the best", "You find it difficult to talk about your feelings", "You often spend time thinking of how things could be improved", "Your decisions are based more on the feeling of a moment than on the thorough planning", "You prefer to spend your leisure time alone  or relaxing in a tranquil atmosphere", "You feel more comfortable sticking to conventional ways", "You are easily affected by strong emotions", "You are always looking for opportunities", "Your desk, workbench, etc. is usually neat and orderly", "As a rule, current preoccupations worry you more than your future plans", "You get pleasure from solitary walks", "It is easy for you to communicate in social situations", "You are consistent in your habits", "You willingly involve yourself in matters which engage your sympathies", "You easily perceive various ways in which events could develop"];
var num_questions = 50;
if (num_questions > all_questions.length) {
	num_questions = all_questions.length;
}
var questions = [];
for (var i = 0; i < num_questions; i++) {
	questions.push(all_questions.splice(Math.floor(Math.random() * all_questions.length), 1));
}
var radio = document.createElement("input");
radio.setAttribute("type", "radio");
var innerHTML;
window.onload = function() {
	if (getURLParameter("result") != null) {
		var p = document.createElement("p");
		p.innerHTML = "You have a strong need for other people to like you and for them to admire you. You have a tendency to be critical of yourself. You have a great deal of unused capacity, which you have not turned to your advantage. Although you have some personality weaknesses, you are generally able to compensate for them. Disciplined and controlled on the outside, you tend to be worrisome and insecure on the inside. At times you have serious doubts as to whether you have made the right decision or done the right thing. You prefer a certain amount of change and variety and become dissatisfied when restricted or limited. You pride yourself as being an independent thinker and do not accept other's opinions without satisfactory proof. You have found it unwise to be too open in revealing yourself to others. At times you are extroverted, friendly, and sociable; at other times you are introverted and reserved. Some of your goals tend to be somewhat unrealistic.";
		document.getElementById("message").appendChild(p);
	}
	else if (getURLParameter("rating") != null) {
		var rating = parseInt(getURLParameter("rating"));
		var phrases = ["", "strongly disagreed with", "disagreed with", "were indifferent about the accuracy of", "agreed with", "strongly agreed with"];
		var messageDiv = document.getElementById("message");
		var p1 = document.createElement("p");
		p1.innerHTML = "You said that you " + phrases[rating] + " this analysis. Actually, this was not an analysis at all. Your responses to the questions had no effect on the results of this personality test. Everyone who has taken this test has received the same response.";
		messageDiv.appendChild(p1);
		var p2 = document.createElement("p");
		var a1 = document.createElement("a");
		a1.setAttribute("href", "http://en.wikipedia.org/wiki/Barnum_effect");
		a1.innerHTML = "Barnum/Forer Effect (Wikipedia)";
		p2.appendChild(a1);
		messageDiv.appendChild(p2);
		var p3 = document.createElement("p");
		var a2 = document.createElement("a");
		a2.setAttribute("href", "https://drive.google.com/file/d/0B2nuC1181x1LczVKYWhVdjd2dmM/view?usp=sharing");
		a2.innerHTML = "Penn & Teller - Personality Tests (Video) [Explicit]";
		p3.appendChild(a2);
		messageDiv(p3);
	}
	else {
		document.getElementById("buttondiv").removeAttribute("style");
		for (var i = 0; i < questions.length; i++) {
			radio.setAttribute("name", "answer" + i.toString());
			radio.setAttribute("value", "yes");
			innerHTML = "<li>" + questions[i] + "</br>" + radio.outerHTML + "YES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			radio.setAttribute("value", "no");
			innerHTML += radio.outerHTML + "NO" + "</li></br>";
			document.getElementById("test").innerHTML += innerHTML;
		}
		if (getURLParameter("debug") != null) {
			answerAll();
		}
	}
}
