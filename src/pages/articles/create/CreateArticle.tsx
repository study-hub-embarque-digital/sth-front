import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ArticleMenuBar } from "./components/article-menu-bar/ArticleMenuBar";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Box, Chip, Stack, TextField, Typography } from "@mui/material";
import { ArticleActionsMenu } from "./components/article-actions-menu/ArticleActionsMenu";
import { STHEditor } from "./components/sth-editor/SthEditor";
import { postArticle } from "./service";
import { useNavigate } from "react-router-dom";

function CreateArticle() {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const navigate = useNavigate();

  const alreadyAddedTag = useMemo(
    () => tags.includes(currentTag),
    [currentTag]
  );

  const extensions = [
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ]

  const editor = useEditor({
    content: "",
    extensions: extensions,
  })

  const publishArticle = async () => {
    const body = {
      titulo: title,
      tags,
      conteudo: JSON.stringify(editor?.getJSON())
    }

    const response = await postArticle(body);

    if (!response.success) {
      console.log('mierda');
      return;
    }

    navigate(`/home/artigos/${response.data?.titulo.replaceAll(" ", "-")}-${response.data?.artigoId}`)
  }

  const handleAddTag = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key == "Backspace" && currentTag.length <= 0 && tags.length > 1) {
      const slicedTags = tags.slice(0, tags.length - 1);
      setTags([...slicedTags]);
    }

    if (event.key !== "Enter") return;

    if (alreadyAddedTag) return;

    setTags([...tags, currentTag]);
    setCurrentTag('');
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag != tagToRemove));
  }

  if (!editor) return;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '40vw', paddingBottom: '50px' }}>
      <Box sx={{ marginBottom: '10px' }}>
        <TextField
          id="article-title"
          label="Título..."
          onChange={e => setTitle(e.target.value)}
          value={title}
          variant="filled"
          color="secondary"
          sx={{ width: '100%', marginBottom: '10px' }}
        />

        <Stack direction="row" spacing={1} sx={{ width: '100%' }} alignItems={"center"}>
          {tags.map(tag => {
            return <Chip key={tag} label={tag} sx={{ width: 'max-content' }} onDelete={() => handleRemoveTag(tag)}></Chip>
          })}

          {tags.length < 5 && <TextField
            color="secondary"
            variant="standard"
            sx={{ width: '100%' }}
            onChange={e => setCurrentTag(e.target.value)}
            value={currentTag}
            onKeyDown={(e) => handleAddTag(e)}
            error={alreadyAddedTag}
            helperText={alreadyAddedTag ? "tag já adicionada" : `Use enter para adicionar tags (${5 - tags.length} restantes)...`}
          />
          }
        </Stack>
      </Box>
      <ArticleMenuBar editor={editor} />
      <STHEditor editor={editor} />
      <ArticleActionsMenu publishAction={publishArticle} />
    </Box>
  );
};

export { CreateArticle };