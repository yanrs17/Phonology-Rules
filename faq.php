<?php include('header.php'); ?>	

<div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="index.php">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li class="active"><a href="faq.php">FAQ</a></li>
            <li><a href="contact.php">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

<div class="container theme-showcase" role="main">

<div class="page-header">
    <h1>Frequently Asked Questions</h1>
</div>

<ol>
	<li>
		<b>How can I use this website?</b><br>
		<p>For the derivations to work, you need to specify two pieces of information. First, you should enter at least one underlying representation (UR). You can enter URs either by using your keyboard or the symbols of the <a href="https://www.internationalphoneticassociation.org/content/ipa-chart">International Phonetic Alphabet</a> (IPA), or by using the copy-paste function provided. You can add additional URs by clicking "Add UR". Second, you should choose your rules and their sequence. We prewritten 25 rules that affect a variety of segments in specific environments. You can each rule by selecting in the drop down menu. You can add additional rules by clicking "Add Rule". Keep in mind that the order of rules is crucial. The software will derive the URs with rules in the order you provided. When a rule applies, the derived form is shown in the line of the rule.</p>
	</li>
	<li>
		<b>How did you select the rules?</b>
		<p>In the first version of Derive!, 25 rules were selected. They are roughly representative of the various processes found in world's languages, and they allow you to explore various interactions between rules. Rules appear as pop-ups in the drop-down menu. The full list of rules is as follows:</p>
		<button class="pure-button" id="hide">Hide Rules</button>
<button class="pure-button" id="show">Show Rules</button><br><br>
<p id="ruleslist">
i. Hiatus Resolution<br>
V → ∅ / V —<br>
ii. Final Vowel Deletion<br>
V → ∅ / — #<br>
iii. Postnasal Voicing<br>
C → [+voice] / [+nasal] — <br>
iv. Nasal Place Assimilation<br>
[+nasal] → [αcoronal βlabial ɣdorsal] / — [−syllabic αcoronal βlabial ɣdorsal]<br>
v. Voicing Assimilation<br>
[−sonorant] → [αvoice] / — [αvoice −sonorant]<br>
vi. Final Coronal Deletion<br>
[+coronal] → ∅ / — #<br>
vii. Height Harmony<br>
V → [−high] / — C₀ [−high −low] <br>
viii. Rounding Harmony<br>
V → [αround] / — (C₀VC₀) [αround] <br>
ix. L-Vocalization<br>
l → o / — {C, #}<br>
x. Dissimilation<br>
V → [−low] / — C₀ [+low]<br>
xi. Initial Stress Assignment<br>
V → [+stress] / # C₀ —<br>
xii. Final Devoicing<br>
[−sonorant] → [−voice] / — #<br>
xiii. Lenition<br>
[−sonorant +voice] → [+continuant] / V — V<br>
xiv. Intervocalic Voicing<br>
[−sonorant] → [+voice] / V — V<br>
xv. Schwa Epenthesis<br>
∅ → ə / C — C<br>
xvi. High Vowel Epenthesis<br>
∅ → i / C — C<br>
xvii. Metathesis<br>
iC → Ci / — #<br>
xviii. Nasal Assimilation<br>
[−continuant] → [+nasal] / — [+nasal]<br>
xix. Velar Palatalization<br>
[+dorsal] → [−dorsal +coronal −anterior] / — [−low −back]<br>
xx. Aspiration<br>
[−continuant −sonorant] → [+spread glottis] / {#, C} — V<br>
xxi. Sibilant Harmony<br>
[+coronal +continuant −sonorant] → [αanterior] / — (C₀VC₀) [αanterior +coronal +continuant −sonorant]<br>
xxii. Vowel Reduction<br>
[−stress +syllabic] → [−low]<br>
xxiii. Strengthening<br>
[−sonorant] → [−continuant] / {#, C} — V<br>
xxiv. Word-Final Consonant Neutralization<br>
C → ʔ / — #<br>
xxv. Manner Assimilation<br>
[−sonorant] → [αcontinuant] / — C₀[αcontinuant −syllabic]
</p>
	</li>
	<li>
		<b>How come rules do not apply vacuously?</b>
		<p>Rules currently do not apply vacuously. That is to say, a rule that does not make a change to a form will not appear to be applying. For instance, Voicing Assimilation changes all obstruents to the voicing of the following obstruent. Formally speaking, voiceless obstruents should map to voiceless obstruents when followed by voiceless obstruents. This is not shown in the derivation. Only non-vacuous application of rules is shown. In the future implementations, we plan to mark both kinds of application (vacuous and non-vacuous). </p>
	</li>
	<li>
		<b>I would like a particular rule to be added.</b>
		<p>For now, the rules cannot be added or customized. We are working on a improved version of Derive! that would allow for full customization of rules. The final goal is to develop a tool in which rules could be written from scratch. </p>
	</li>
	<li>
		<b>I would like rules to be iterative.</b>
		<p>Rules currently apply non-iteratively. For instance, if the rule raises a single vowel before a high vowel, a sequence of three vowels could have at most one change.</p>
	</li>
	<li>
		<b>What kind of symbols can be entered?</b>
		<p>Currently, all IPA letter-like symbols for vowels and pulmonic consonants can be entered. The only exception is the voiced labiodental flap, which is not supported. Ligatures used for affricates and other complex segments cannot be entered. Diphthongs will be treated as vowel sequences. Syllabification is not implemented. All vowels are syllabic, and all consonants are non-syllabic. Of the superscript symbols, only aspiration can be added: ʰ. Refer to the IPA chart on the website for a full set of symbols recognized by the software. Non-pulmonic sounds, most diacritics, tone, and domain boundaries are not implemented. For stress, see below. All URs must be single words, and morpheme boundaries will not be recognized.</p>
	</li>
	<li>
		<b>How to enter stress?</b>
		<p>Stress is marked with " immediately before the stressed segment.</p>
	</li>
	<li>
		<b>How to enter syllables? What other, non-segmental information can be put in the UR?</b><br>
		<p>Syllabification is currently not supported. All vowels are syllabic, and all consonants are non-syllabic. </p>
	</li>
	<li>
		<b>I am using Derive! on my tablet, but I cannot see the rules.</b><br>
		<p>Pop-ups are currently only supported in the desktop version.</p>
	</li>
	<li>
		<b>I have a suggestion.</b><br>
		<p>We can't wait to hear from you! You can leave your comment by filling out the feedback form here <link to form>. Before reaching out to the authors of Derive!, please, consult the list of known issues <a href="http://www.jurgec.net/derive/known_issues.txt">here</a>.</p>
	</li>
	<!-- <li>
		<b></b>
		<p></p>
	</li> -->
</ol>
</div>
<?php include('footer.php'); ?>	