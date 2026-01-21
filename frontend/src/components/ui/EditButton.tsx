import { Link } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

interface EditButtonProps extends Omit<ButtonProps, 'asChild' | 'children'> {
  to?: string;
}

const EditButton: React.FC<EditButtonProps> = ({ to, ...props }) => {
  if (!to) {
    return (
        <Button variant="ghost" size="sm" disabled {...props}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
    );
  }
  
  return (
    <Button asChild variant="ghost" size="sm" {...props}>
      <Link to={to}>
        <Pencil className="mr-2 h-4 w-4" /> Edit
      </Link>
    </Button>
  );
};

export default EditButton;
