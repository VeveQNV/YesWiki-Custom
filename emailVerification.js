$(function ()
{
	function uid ()
	{
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
  	}

	$("input[type=email]")
	.each (function ()
	{		
		var vDifferent = 'Les adresses emails sont différentes';
		var vSame = 'Les adresses emails sont identiques';

		var vInput = $(this);
		
		var vForm =	vInput.parents ("form").eq(0);
	
		if (vForm.attr ("id") == "ajax-mail-form-handler")
			return true;

		var vValidate =	vForm.find ("button[type=submit]");
		var vControlGroup = vInput.parents (".control-group").eq(0);
		var vControlGroupClone = vControlGroup.clone ().insertAfter (vControlGroup);

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
					vValidate.attr ("disabled", "").attr ("title", vDifferent);
				}
				else
				{
					vText.html ('<span style="color : var(--primary-color) !important;">' + vSame + '</span>').css ("display", "block");
					vValidate.removeAttr ("disabled").attr ("title", "");
				}			
			}
		};

		vInput.on ("keyup change", verifyInputs);
				
		var vInputClone = vControlGroupClone
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

		vControlGroupClone
		.find (".controls")
		.append (vText);

		vControlGroupClone
		.find ("label")
		.before (vLabel)		
		.remove ();
		
		verifyInputs ();
	});	
});
