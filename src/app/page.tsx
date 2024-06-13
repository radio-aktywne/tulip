import { Button, Stack } from "@mantine/core";
import Link from "next/link";

export default function IndexPage() {
  return (
    <Stack>
      <Button component={Link} href="/shows">
        Shows
      </Button>
      <Button component={Link} href="/events">
        Events
      </Button>
    </Stack>
  );
}
