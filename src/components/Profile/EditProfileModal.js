import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Input,
  Button,
  Label,
} from "../ui";
import { X } from "lucide-react";

const EditProfileModal = ({
  isOpen,
  onClose,
  formData,
  onChange,
  onSubmit,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <div className="absolute right-2 top-2 flex space-x-3">
            <DialogClose className="rounded-sm opacity-70 hover:opacity-100">
              <X className="h-5 w-5" />
            </DialogClose>
          </div>
        </DialogHeader>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={(e) =>
                onChange({ ...formData, username: e.target.value })
              }
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth || ""}
              onChange={(e) =>
                onChange({ ...formData, dateOfBirth: e.target.value })
              }
              max={
                new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={formData.email} disabled />
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 w-1/2 text-gray-800 hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-1/2">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
