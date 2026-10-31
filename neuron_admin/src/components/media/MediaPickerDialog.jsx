import Dialog from "../ui/Dialog";
import MediaBrowser from "./MediaBrowser";

/** "Choose from Library": a dialog wrapping MediaBrowser in pick mode. */
export default function MediaPickerDialog({ open, onClose, onPick, accept = "any" }) {
  return (
    <Dialog
      open={open}
      size="lg"
      title={accept === "image" ? "Choose an Image" : "Choose a File"}
      description="Click a file to use it. You can also upload new files or create folders here."
      onClose={onClose}
    >
      {open ? (
        <MediaBrowser
          mode="pick"
          accept={accept}
          onPick={(file) => {
            onPick(file);
            onClose();
          }}
        />
      ) : null}
    </Dialog>
  );
}
