import { useNavigate } from 'react-router-dom';
import { Button, type ButtonProps } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/utils/utils';

const BackButton: React.FC<ButtonProps> = ({ className, ...props }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="destructive"
      onClick={() => navigate(-1)}
      className={cn("font-bold", className)}
      {...props}
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
};

export default BackButton;
