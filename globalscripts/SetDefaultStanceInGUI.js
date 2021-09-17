var g_ActiveTemplate = "";

function getUserDefinedDefaultStance(entity, template) {

	if (entity) {
		let config_param = "moddefaultstance." + entity;
		let value = Engine.ConfigDB_GetValue("user", config_param);
		if (value)
			return value;
	}
	return template.DefaultStance;
}

function setDefaultStance(behavior) {

	var entityStance = Engine.GetGUIObjectByName(behavior);
	if (entityStance) {
		if (g_ActiveTemplate) {
			Engine.ConfigDB_CreateAndWriteValueToFile(
				"user",
				"moddefaultstance." + g_ActiveTemplate.Identity.SelectionGroupName,
				behavior,
				"config/user.cfg"
			);
			updateStanceButtons();
		}
		else {
			entityStance.caption = "only for entities";
		}
	}
	else {
		error("Not found object '" + behavior + "'\n");
	}
}

function setActiveTemplate(template) {

	g_ActiveTemplate = template;
}

function updateStanceButtons() {

	// TODO g_Stances from UnitAI
	var g_Stances = ["violent", "aggressive", "defensive", "passive", "standground"];

	for (let behavior of g_Stances) {
		var entityStance = Engine.GetGUIObjectByName(behavior);
		if (entityStance) {
			if (g_ActiveTemplate) {
				if (behavior == getUserDefinedDefaultStance(g_ActiveTemplate.Identity.SelectionGroupName, g_ActiveTemplate)) {
					entityStance.caption = behavior + " (selected)";
				}
				else {
					entityStance.caption = behavior;
				}
			}
		}
	}
}
