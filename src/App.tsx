import { useQuery, useMutation } from "@tanstack/react-query";

const POSTS = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function App() {
  const postsQuery = useQuery({
    queryKey: ["posts"],
    queryFn: async (obj) => {
      console.log(obj);
      await wait(1000);
      return POSTS;
    },
  });
  const newPostMutation = useMutation({
    mutationFn: async (title: string) => {
      await wait(1000);
      //ts-ignore
      POSTS.push({ id: crypto.randomUUID(), title });
    },
  });

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.isError) return <pre>{JSON.stringify(postsQuery.error)}</pre>;

  return (
    <div>
      {postsQuery.data?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button onClick={() => newPostMutation.mutate("New Post")}>
        Add new
      </button>
    </div>
  );
}

function wait(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export default App;
