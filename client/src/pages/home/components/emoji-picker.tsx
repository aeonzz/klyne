import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmojiPicker as EmojiPickerPrimitive } from "@ferrucc-io/emoji-picker";
import type { BaseEmojiPickerProps } from "@/types/emoji";
import { cn } from "@/lib/utils";

function EmojiPicker({
  children,
  ...props
}: React.ComponentProps<typeof Popover>) {
  return <Popover {...props}>{children}</Popover>;
}

function EmojiPickerTrigger({
  children,
  ref,
  className,
  ...props
}: React.ComponentProps<typeof PopoverTrigger>) {
  return (
    <PopoverTrigger ref={ref} className={className} {...props}>
      {children}
    </PopoverTrigger>
  );
}

function EmojiPickerContent({
  ...props
}: React.ComponentProps<typeof PopoverContent> & BaseEmojiPickerProps) {
  const {
    onEmojiSelect,
    emojisPerRow = 9,
    emojiSize = 28,
    maxUnicodeVersion,
    ...rest
  } = props;
  const { className, ref, ...popoverProps } = rest;

  const baseEmojiProps: BaseEmojiPickerProps = {
    onEmojiSelect,
    emojisPerRow,
    emojiSize,
    maxUnicodeVersion,
  };
  const popoverContentProps: React.ComponentProps<typeof PopoverContent> = {
    className,
    ref,
    ...popoverProps,
  };

  return (
    <PopoverContent
      ref={popoverContentProps.ref}
      className={cn("w-auto p-2", popoverContentProps.className)}
      {...popoverProps}
    >
      <EmojiPickerPrimitive className="border-none w-[300px]" {...baseEmojiProps}>
        <EmojiPickerPrimitive.Header className="">
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
  );
}

export { EmojiPicker, EmojiPickerTrigger, EmojiPickerContent };
