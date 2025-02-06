import React from "react";
import axios from "axios";

type User = {
  id: string;
  name: string;
  age: string;
};

export default function About() {
  const [data, setData] = React.useState<User[] | null>(null);
  React.useEffect(() => {
    const wtf = async () => {
      const tangina = await axios.get("http://localhost:8080/api/v1/users/all");
      setData(tangina.data);
      return tangina.data;
    };
    wtf();
  }, []);

  console.log(data);
  return (
    <div>
      {data?.map((user, index) => (
        <React.Fragment key={index}>
          <h1>{user.id}</h1>
          <h1>{user.name}</h1>
          <h1>{user.age}</h1>
      </React.Fragment>
      ))}
    </div>
  );
}
