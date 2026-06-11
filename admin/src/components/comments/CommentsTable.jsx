import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

const CommentTable = ({
  comments,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              User
            </TableHead>

            <TableHead>
              Destination
            </TableHead>

            <TableHead>
              Rating
            </TableHead>

            <TableHead>
              Comment
            </TableHead>

            <TableHead>
              Date
            </TableHead>

            <TableHead>
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {comments?.map(
            (comment) => (
              <TableRow
                key={comment._id}
              >
                <TableCell>
                  {
                    comment.user
                      ?.username
                  }
                </TableCell>

                <TableCell>
                  {
                    comment
                      .destination
                      ?.name
                  }
                </TableCell>

                <TableCell>
                  {comment.rating}
                </TableCell>

                <TableCell>
                  {comment.message}
                </TableCell>

                <TableCell>
                  {new Date(
                    comment.createdAt
                  ).toLocaleDateString()}
                </TableCell>

                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() =>
                      onDelete(
                        comment._id
                      )
                    }
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommentTable;