/* 
	Add an email verification input for each email input contained in a form and included in a .form-group 
	Author : Yves Gufflet - contact@yvesgufflet.fr
	Date : 21/07/2025 
*/

$(function ()
{
	function uid ()
	{
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
  	}

	var vEmailsCount = 0;

	$("input[type=email]")
	.each (function ()
	{		
		var vDifferent = 'Les adresses emails sont différentes';
		var vSame = 'Les adresses emails sont identiques';

		var vInput = $(this);
		
		var vForm =	vInput.parents ("form").eq(0);
	
		var vParentGroup = vInput.parents (".form-group").eq(0);
		
		if (vParentGroup.length == 0) return true;

		vEmailsCount++;

		var vValidate =	vForm.find ("button[type=submit]");

		var vParentGroupClone = vParentGroup.clone ().insertAfter (vParentGroup);

		var vID = vInput.attr ("id") + "_check_" + uid();
		var vText = $('<div></div>');
		var vLabel = $('<label for="' + vID + '" class="control-label col-sm-3"><span class="symbole_obligatoire"></span> Vérification email</label>');

		vValidate.attr ("disabled","");

		function verifyInputs ()
		{
			if (vInputClone.val () == "")
			{	    
				vText.html ("").css ("display", "none");
				vValidate.attr ("disabled", "").attr ("title", vDifferent);
			}
			else
			{	    
				if (vInput.val () != vInputClone.val ())
				{
					vText.html ('<span style="color : var(--danger-color) !important;">' + vDifferent + '</span>').css ("display", "block");					
				}
				else
				{
					vText.html ('<span class="same_adress" style="color : var(--primary-color) !important;">' + vSame + '</span>').css ("display", "block");					
				}			
			}
			
			if ($(".same_adress").length == vEmailsCount)
			{
				vValidate.removeAttr ("disabled").attr ("title", "");				
			}
			else
			{
				vValidate.attr ("disabled", "").attr ("title", vDifferent);
			}
		};

		vInput.on ("keyup change", verifyInputs);
				
		var vInputClone = vParentGroupClone
		.find ("input[type=email]")
		.addClass ("yw-email-verification")
		.attr (
		{
			"id" : vID,
			"name" : "",
			"type" : "email",
			"placeholder" : "Vérification email"
		})
		.on ("keyup change", verifyInputs);

		vParentGroupClone
		//.find (".controls")
		.append (vText);

		vParentGroupClone
		.find ("label")
		.before (vLabel)		
		.remove ();
		
		verifyInputs ();
	});	
});
