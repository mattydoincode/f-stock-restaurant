"use client";

import {useCallback, useState} from "react";
import {Plus} from "lucide-react";
import {useMenu} from "@/hooks/use-menu";
import {SaveIndicator} from "@/components/dashboard/save-indicator";
import {SectionCard} from "@/components/dashboard/section-card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog";

export default function MenuPage() {
	const menu = useMenu();
	const [newSectionName, setNewSectionName] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);

	const handleAddSection = useCallback(async () => {
		if (!newSectionName.trim()) return;
		await menu.addSection({name: newSectionName.trim()});
		setNewSectionName("");
		setDialogOpen(false);
	}, [newSectionName, menu]);

	if (menu.loading) {
		return (
			<div className="flex items-center justify-center py-12 text-muted-foreground">
				Loading...
			</div>
		);
	}

  return (
	  <div className="space-y-6">
		  <div className="flex items-center justify-between">
			  <div>
				  <h1 className="text-2xl font-bold">Menu Editor</h1>
				  <p className="mt-1 text-sm text-muted-foreground">
					  Add sections and items to build your menu.
				  </p>
			  </div>
			  <div className="flex items-center gap-3">
				  <SaveIndicator status={menu.status} errorMessage={menu.errorMessage}/>
				  <Button onClick={() => setDialogOpen(true)}>
					  <Plus className="mr-1 h-4 w-4"/>
					  Add Section
				  </Button>
				  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					  <DialogContent>
						  <DialogHeader>
							  <DialogTitle>New Menu Section</DialogTitle>
						  </DialogHeader>
						  <div className="space-y-2">
							  <Label htmlFor="sectionName">Section Name</Label>
							  <Input
								  id="sectionName"
								  value={newSectionName}
								  onChange={(e) => setNewSectionName(e.target.value)}
								  placeholder="e.g. Appetizers, Main Courses, Desserts"
								  onKeyDown={(e) => {
									  if (e.key === "Enter") handleAddSection();
								  }}
							  />
						  </div>
						  <DialogFooter>
							  <Button variant="outline" onClick={() => setDialogOpen(false)}>
								  Cancel
							  </Button>
							  <Button onClick={handleAddSection} disabled={!newSectionName.trim()}>
								  Create
							  </Button>
						  </DialogFooter>
					  </DialogContent>
				  </Dialog>
			  </div>
		  </div>

		  {menu.sections.length === 0 ? (
			  <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed py-12">
				  <p className="mb-4 text-muted-foreground">
					  Your menu is empty. Add your first section to get started.
				  </p>
				  <Button variant="outline" onClick={() => setDialogOpen(true)}>
					  <Plus className="mr-1 h-4 w-4"/>
					  Add Section
				  </Button>
			  </div>
		  ) : (
			  <div className="space-y-4">
				  {menu.sections.map((section, idx) => (
					  <SectionCard
						  key={section.id}
						  section={section}
						  onUpdateSection={(data) => menu.updateSection(data)}
						  onDeleteSection={() => menu.deleteSection(section.id)}
						  onMoveUp={() => menu.moveSectionUp(section.id)}
						  onMoveDown={() => menu.moveSectionDown(section.id)}
						  isFirst={idx === 0}
						  isLast={idx === menu.sections.length - 1}
						  onAddItem={(data) => menu.addItem(data)}
						  onUpdateItem={(data) => menu.updateItem(section.id, data)}
						  onDeleteItem={(itemId) => menu.deleteItem(section.id, itemId)}
						  onMoveItemUp={(itemId) => menu.moveItemUp(section.id, itemId)}
						  onMoveItemDown={(itemId) => menu.moveItemDown(section.id, itemId)}
					  />
				  ))}
			  </div>
		  )}
    </div>
  );
}
