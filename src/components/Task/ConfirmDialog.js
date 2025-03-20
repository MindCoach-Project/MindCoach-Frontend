"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui";
import { Button } from "../ui";

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-inherit">
        <DialogHeader>
          <DialogTitle>{title || "Confirm Action"}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>{message || "Are you sure you want to proceed?"}</p>
        </div>

        <div className="flex flex-row items-end justify-end gap-2 pt-2">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose(false);
            }}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
