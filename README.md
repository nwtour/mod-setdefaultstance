# mod-setdefaultstance
```
simulation/components/UnitAI.js
@@ -3443,12 +3443,7 @@
 
 	this.formationAnimationVariant = undefined;
 	this.cheeringTime = +(this.template.CheeringTime || 0);
-	this.SetStance(
-		getUserDefinedDefaultStance(
-			Engine.QueryInterface(this.entity, IID_Identity).GetSelectionGroupName(),
-			this.template
-		)
-	);
+	this.SetStance(this.template.DefaultStance);
 };
 
 UnitAI.prototype.IsTurret = function()
gui/reference/viewer/ViewerPage.js
@@ -32,10 +32,17 @@
 		let templateName = removeFiltersFromTemplateName(data.templateName);
 		let isTech = TechnologyTemplateExists(templateName);
 
+		setActiveTemplate(undefined);
+
 		// Attempt to get the civ code from the template, or, if
 		// it's a technology, from the researcher's template.
-		if (!isTech)
-			this.setActiveCiv(this.TemplateLoader.loadEntityTemplate(templateName, this.TemplateLoader.DefaultCiv).Identity.Civ);
+		if (!isTech) {
+			let entity = this.TemplateLoader.loadEntityTemplate(templateName, this.TemplateLoader.DefaultCiv);
+			this.setActiveCiv(entity.Identity.Civ);
+			setActiveTemplate(entity);
+			updateStanceButtons();
+		}
 
 		if (this.activeCiv == this.TemplateLoader.DefaultCiv && data.civ)
 			this.setActiveCiv(data.civ);
simulation/components/UnitAI.js
@@ -3443,7 +3443,12 @@
 
 	this.formationAnimationVariant = undefined;
 	this.cheeringTime = +(this.template.CheeringTime || 0);
-	this.SetStance(this.template.DefaultStance);
+	this.SetStance(
+		getUserDefinedDefaultStance(
+			Engine.QueryInterface(this.entity, IID_Identity).GetSelectionGroupName(),
+			this.template
+		)
+	);
 };
 
 UnitAI.prototype.IsTurret = function()
gui/reference/viewer/viewer.xml
@@ -30,6 +30,27 @@
 
 		<object name="entityInfo" type="text" style="ModernText" size="16 128+48+8 100%-16 100%-48"/>
 
+                <object name="violent" type="button" style="ModernButtonRed" size="50%-250 100%-80 50%-180 100%-50">
+               	        <translatableAttribute id="caption">n/a</translatableAttribute>
+       	                <action on="Press">setDefaultStance("violent");</action>
+                </object>
+                <object name="aggressive" type="button" style="ModernButtonRed" size="50%-180 100%-80 50%-110 100%-50">
+               	        <translatableAttribute id="caption">n/a</translatableAttribute>
+       	                <action on="Press">setDefaultStance("aggressive");</action>
+                </object>
+                <object name="defensive" type="button" style="ModernButtonRed" size="50%-110 100%-80 50%-40 100%-50">
+                        <translatableAttribute id="caption">n/a</translatableAttribute>
+                        <action on="Press">setDefaultStance("defensive");</action>
+                </object>
+                <object name="passive" type="button" style="ModernButtonRed" size="50%-40 100%-80 50%+30 100%-50">
+                        <translatableAttribute id="caption">n/a</translatableAttribute>
+                        <action on="Press">setDefaultStance("passive");</action>
+                </object>
+                <object name="standground" type="button" style="ModernButtonRed" size="50%+30 100%-80 50%+100 100%-50">
+                        <translatableAttribute id="caption">n/a</translatableAttribute>
+                        <action on="Press">setDefaultStance("standground");</action>
+                </object>
+
 		<!-- Close button -->
 		<include file="gui/reference/common/Buttons/CloseButton.xml"/>
```
