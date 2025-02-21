import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmojiPicker as EmojiPickerPrimitive } from "@ferrucc-io/emoji-picker";
import { Button } from "@/components/ui/button";
import { Smile } from "lucide-react";

interface EmojiPickerProps {
  setContent: (updater: (prevContent: string) => string) => void;
  disabled: boolean;
}

export default function EmojiPicker({
  setContent,
  disabled,
}: EmojiPickerProps) {
  const handleEmojiSelect = React.useCallback(
    (emoji: string) => {
      setContent((prevContent) => prevContent + emoji);
    },
    [setContent]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="rounded-full hover:bg-primary/20 [&_svg]:size-5"
          variant="ghost"
          size="icon"
          disabled={disabled}
        >
          <Smile className="text-primary" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3" align="start">
        <EmojiPickerPrimitive
          className="w-[300px] border-none"
          emojisPerRow={6}
          emojiSize={40}
          onEmojiSelect={handleEmojiSelect}
        >
          <EmojiPickerPrimitive.Header className="p-0 pb-3">
            <EmojiPickerPrimitive.Input
              placeholder="Search emoji"
              autoFocus={true}
              className="border !bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </EmojiPickerPrimitive.Header>
          <EmojiPickerPrimitive.Group>
            <EmojiPickerPrimitive.List
              hideStickyHeader={true}
              containerHeight={320}
            />
          </EmojiPickerPrimitive.Group>
        </EmojiPickerPrimitive>
      </PopoverContent>
    </Popover>
  );
}
