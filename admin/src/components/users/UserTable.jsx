import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

const UserTable = ({
  users,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Username
            </TableHead>

            <TableHead>
              Email
            </TableHead>

            <TableHead>
              Verified
            </TableHead>

            <TableHead>
              Logged In
            </TableHead>

            <TableHead>
              Joined
            </TableHead>

            <TableHead>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {user.username}
              </TableCell>

              <TableCell>
                {user.email}
              </TableCell>

              <TableCell>
                {user.isVerified
                  ? "Yes"
                  : "No"}
              </TableCell>

              <TableCell>
                {user.isLoggedIn
                  ? "Online"
                  : "Offline"}
              </TableCell>

              <TableCell>
                {new Date(
                  user.createdAt
                ).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() =>
                    onDelete(user._id)
                  }
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;