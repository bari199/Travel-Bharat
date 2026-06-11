import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useNavigate } from "react-router-dom";

const DestinationTable = ({
  destinations,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>

            <TableHead>Name</TableHead>

            <TableHead>City</TableHead>

            <TableHead>State</TableHead>

            <TableHead>Category</TableHead>

            <TableHead>Featured</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {destinations?.length > 0 ? (
            destinations.map(
              (destination) => (
                <TableRow
                  key={destination._id}
                >
                  <TableCell>
                    <img
                      src={
                        destination
                          .images?.[0] ||
                        "https://placehold.co/80x60"
                      }
                      alt={
                        destination.name
                      }
                      className="h-14 w-20 rounded object-cover"
                    />
                  </TableCell>

                  <TableCell className="font-medium">
                    {destination.name}
                  </TableCell>

                  <TableCell>
                    {destination.city}
                  </TableCell>

                  <TableCell>
                    {destination.state}
                  </TableCell>

                  <TableCell>
                    {
                      destination.category
                    }
                  </TableCell>

                  <TableCell>
                    {destination.featured ? (
                      <Badge>
                        Featured
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                      >
                        No
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          navigate(
                            `/destinations/edit/${destination._id}`
                          )
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          onDelete(
                            destination._id
                          )
                        }
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-10"
              >
                No destinations found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DestinationTable;