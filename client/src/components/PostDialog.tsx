import { createPost } from '@/api/queries';
import { useAuth } from '@/hooks/useAuth';
import {
  Button,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

type DialogProps = {
  refreshPosts: () => void;
};

const PostDialog = ({ refreshPosts }: DialogProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async () => {
    await createPost({
      title,
      content,
      user_id: user?.id,
    });
    setTitle('');
    setContent('');
    refreshPosts();
  };

  const handleCancel = () => {
    setTitle('');
    setContent('');
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" className="btn">
          Add Post
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Post</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Title</Field.Label>
                  <Input
                    placeholder="Post title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Content</Field.Label>
                  <Textarea
                    placeholder="Write your post here"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default PostDialog;
