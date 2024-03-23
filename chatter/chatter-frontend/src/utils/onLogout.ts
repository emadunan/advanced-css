import router from "../components/router";
import client from "../constants/apollo-client";
import { authenticatedVar } from "../constants/authenticated";

export function onLogout() {
  authenticatedVar(false);

  // Redirect to the login page
  router.navigate("/login");

  // Reset Apollo Client's store
  client.clearStore();
}
