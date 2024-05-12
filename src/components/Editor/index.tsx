import { EditorContent, useEditor, type Content } from "@tiptap/react";
import { useEffect, useState } from "react";
import { TipTapExtension } from "./Extensions";

type EditorProps = {
  label?: string;
  minHeight?: string;
  data: string | undefined;
  onChange: (value: string) => void;
};

const Editor = ({
  label,
  minHeight = "min-h-[500px]",
  data,
  onChange,
}: EditorProps) => {
  const [hydrated, setHydrated] = useState(false);

  const editor = useEditor({
    extensions: [...TipTapExtension,
      
    ],
    content: data,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none group-focus:border-y-2",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(data as Content);
      if (!hydrated) {
        setHydrated(true);
      }
    }
  }, [editor, hydrated]);

  return (
    <>
      {label && <label className="font-mono text-sm uppercase">{label}</label>}
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className={`relative w-full max-w-screen-lg select-none border border-mono-black bg-mono-white p-2.5 focus-within:border-x-2 focus-within:ring-0 ${minHeight}`}
      >
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Editor;
