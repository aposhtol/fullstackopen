import { useEffect } from "react";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";
import Notice from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { isUserLoggedIn, handleLogout } from "./reducers/userReducer";
import { initializeUsers } from "./reducers/usersReducer";
import {
  Routes,
  Route,
  Link,
  useMatch,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  MantineProvider,
  AppShell,
  Title,
  Button,
  Navbar,
  Header,
  Tabs,
} from "@mantine/core";

const App = () => {
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(isUserLoggedIn());
    dispatch(initializeUsers());
  }, [dispatch]);

  const match = useMatch("/users/:id");
  const showUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const navigate = useNavigate();
  const { tabValue } = useParams();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        headings: {
          fontWeight: 50,
        },
      }}
    >
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} p="xs">
            {/* Navbar content */}
            <Tabs
              value={tabValue}
              onTabChange={(value) => navigate(`/${value}`)}
              orientation="vertical"
            >
              <Tabs.List>
                <Tabs.Tab value="blogs">Blogs</Tabs.Tab>
                <Tabs.Tab value="users">Users</Tabs.Tab>
                {user ? (
                  <div>
                    <p>{user.name} logged in</p>
                    <Button
                      color="red"
                      radius="xl"
                      onClick={() => dispatch(handleLogout())}
                    >
                      logout
                    </Button>
                  </div>
                ) : (
                  <Tabs.Tab value="login">Login</Tabs.Tab>
                )}
              </Tabs.List>
              <Tabs.Panel ta="center" value="blogs">
                List of blogs
              </Tabs.Panel>
              <Tabs.Panel ta="center" value="users">
                List of users
              </Tabs.Panel>
              {!user && (
                <Tabs.Panel ta="center" value="login">
                  Login to application
                </Tabs.Panel>
              )}
            </Tabs>
          </Navbar>
        }
        header={
          <Header align="center" height={60} p={5}>
            {/* Header content */}
            <Title component={Link} to="/" size="h1" color="red.5">
              blog app
            </Title>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
        <Notice />
        <Routes>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users/:id" element={<User user={showUser} />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<h1>Dobrodošli u aplikaciju Blog!</h1>} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
