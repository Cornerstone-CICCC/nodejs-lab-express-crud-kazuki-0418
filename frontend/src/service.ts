const PORT = 4000;

export const getEmployees = async () => {
  const res = await fetch(`http://localhost:${PORT}/employees`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};

export const addEmployee = async (
  firstname: string,
  lastname: string,
  age: number,
  isMarried: boolean
) => {
  const res = await fetch(`http://localhost:${PORT}/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add employee: ${res.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  return data;
};

export const updateEmployee = async (
  id: string,
  firstname: string,
  lastname: string,
  age: number,
  isMarried: boolean
) => {
  const res = await fetch(`http://localhost:${PORT}/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to update employee: ${res.statusText}`);
  }

  const data = await res.json(); // Updated employee data
  return data;
};

export const deleteEmployee = async (id: string) => {
  const res = await fetch(`http://localhost:${PORT}/employees/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete employee: ${res.statusText}`);
  }

  const data = await res.json(); // Deleted employee data
  return data;
};

export const searchEmployee = async (firstname: string) => {
  const res = await fetch(
    `http://localhost:${PORT}/employees/search?firstname=${firstname}`,
    {
      method: "GET",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to search employees: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
};
