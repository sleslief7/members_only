import { toaster } from '@/components/ui/toaster';
import { updateUserMembership } from '@/api/queries';
import { useAuth } from '@/hooks/useAuth';
import {
  Button,
  CloseButton,
  Dialog,
  Portal,
  Field,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

const MembershipDialog = () => {
  const [memberKey, setMemberKey] = useState('');
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuth();

  const handleSubmit = async () => {
    if (memberKey.trim().toLowerCase() === import.meta.env.VITE_MEMBER_KEY) {
      const newUser = {
        ...user,
        is_member: true,
      };
      const updatedUser = await updateUserMembership(
        newUser.id!,
        newUser.is_member,
        newUser.is_admin!
      );
      if (updatedUser) {
        setUser(updatedUser);
        toaster.create({
          title: 'You became a member',
          type: 'success',
        });
      }
    } else {
      toaster.create({
        title: 'Sorry wrong secret key try again!',
        type: 'error',
      });
    }
    setMemberKey('');
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="btn" textStyle={'xl'}>
          Become a member
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title textStyle={'2xl'}>
                To become a member solve the riddle
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Field.Root required>
                <Field.Label>
                  Membership secret key:
                  <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Como se llama mi padre?"
                  value={memberKey}
                  onChange={(e) => setMemberKey(e.target.value)}
                />
              </Field.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleSubmit}>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default MembershipDialog;
