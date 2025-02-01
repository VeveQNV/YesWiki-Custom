$(function ()
{
	function uid ()
	{
		return Date.now().toString(36) + Math.random().toString(36).substr(2);
  	}

	$("input[type=email]")
	.each (function ()
	{
		var vDifferent = '<span style="color : var(--danger-color) !important;">Les adresses emails sont différentes</span>';
		var vSame = '<span style="color : var(--primary-color) !important;">Les adresses emails sont identiques</span>';

		var vInput = $(this);

		var vValidate =	vInput.parents ("form").eq(0).find ("button[type=submit]");
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
					vText.html (vDifferent).css ("display", "block");
					vValidate.attr ("disabled", "").attr ("title", vDifferent);
				}
				else
				{
					vText.html (vSame).css ("display", "block");
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
