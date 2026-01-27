import React from 'react';
import { Button } from '@/components/ui/button';
import type { UserProfile } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserDetailsSummaryProps {
  user: UserProfile | null;
}

const UserDetailsSummary: React.FC<UserDetailsSummaryProps> = ({ user }) => {
  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading user information...</p>
        </CardContent>
      </Card>
    );
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Account Details</CardTitle>
        <Button asChild variant="outline" size="sm">
          <Link to="/dashboard/account">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-gray-200 text-lg font-semibold text-gray-700">
          {getInitials(user.first_name, user.last_name)}
        </div>
        <div>
          <p className="text-lg font-semibold">{`${user.first_name} ${user.last_name}`}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserDetailsSummary;
