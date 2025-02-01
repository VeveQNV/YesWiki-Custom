$(function ()
{
  function checkPasswordStrength(password)
  {
    let strength = 0;

    // Vérification de la longueur
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++; // Bonus pour une meilleure longueur

    // Vérification des types de caractères
    if (/[a-z]/.test(password)) strength++; // Lettres minuscules
    if (/[A-Z]/.test(password)) strength++; // Lettres majuscules
    if (/[0-9]/.test(password)) strength++; // Chiffres
    if (/[\W_]/.test(password)) strength++; // Caractères spéciaux

    // Évaluation de la force
    if (strength == 0) return "none";
    if (strength <= 2) return "weak";
    if (strength <= 4) return "acceptable";
    return "strong";
  }
  
  $("input[name=mot_de_passe_wikini]")
  .each (function ()
  { 
  	var vMe = $(this);
  	
	var vParentControlGroup = vMe.parents (".control-group").eq(0);
	
	var vControlGroup = vParentControlGroup
	.clone()
	.addClass ("yw-password-strength-control-group")
	.insertAfter (vParentControlGroup);
	
	var vInputGroup = 
	vControlGroup
	.find ("label")
	.remove ()
	.end ()
	.find (".input-group")
	.html ("");
	
	var vPasswordStrength = $('<div class="yw-password-strength"></div>');
	
	vPasswordStrength
	.appendTo (vInputGroup);	
	
	function updateStrength ()
	{
		var vStrength = checkPasswordStrength (vMe.val());
		
		var vColor;
		var vText; 
		
		vControlGroup.css ("display", "block");
		
		switch (vStrength)
		{
			case "none" :	
				vControlGroup.css ("display", "none"); 
				vColor = "violet";
				vText = "none";
			break;		
			case "weak" :	
				vColor = "red";
				vText = "insuffisante";
			break;
			case "acceptable" :
				vColor = "orange";	
				vText = "acceptable";
			break;			
			case "strong" :
				vColor = "green";
				vText = "robuste";
			break;			
		}
		
		vPasswordStrength
		.css ("color", vColor)
		.html ("<b>Sécurité : " + vText + "</b>")
		.removeClass ("yw-password-strength-none")
		.removeClass ("yw-password-strength-weak")
		.removeClass ("yw-password-strength-acceptable")
		.removeClass ("yw-password-strength-strong")
		.addClass ("yw-password-strength-" + vStrength);
	}
	
	vMe
	.on ("change keyup", updateStrength);
	
	updateStrength ();
  })
});
