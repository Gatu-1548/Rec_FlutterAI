import axios from 'axios';

const API_URL = 'https://backendrecognit-production.up.railway.app/api/';

// Login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}users/login`, { email, password });
    return response.data;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new Error('Error de login');
  }
};
 
// Registro
export const registerUser = async (firstName, lastName, email, gender, password) => {
  try {
    const response = await axios.post(`${API_URL}users/register`, {
      firstName,
      lastName,
      email,
      gender,
      password,
    });
    return response.data;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new Error('Error en el registro');
  }
};
//--------------apiUser--------------------
export const assignRole = async (userId, roleId) => {
  try {
    const response = await axios.put(`${API_URL}users/assign-role`, {
      userId,
      roleId
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}users/list`);
  return res.data.users;
};

export const registerUser1 = async (userData) => {
  const res = await axios.post(`${API_URL}users/register`, userData);
  return res.data;
};

export const updateUser = async (userId, updatedData) => {
  const res = await axios.put(`${API_URL}users/update`, {
    userId,
    ...updatedData,
  });
  return res.data;
};

export const deleteUser = async (userId) => {
  const res = await axios.delete(`${API_URL}users/delete`, {
    data: { userId },
  });
  return res.data;
};

//-----------------apiroles-------------------
export const getRoles = async () => {
  const response = await axios.get(`${API_URL}roles/get`);
  return response.data;
};

export const createRole = async (roleName) => {
  const response = await axios.post(`${API_URL}roles/create`, { role_name: roleName });
  return response.data;
};

export const updateRole = async (id, roleName) => {
  const response = await axios.put(`${API_URL}roles/update`, {
    id,
    role_name: roleName,
  });
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axios.delete(`${API_URL}roles/delete`, {
    data: { id },
  });
  return response.data;
};

//---------------apisIA----------------------
export const generateUIFromImage = async (file) => {
  const formData = new FormData();
  formData.append('mode', 'image');
  formData.append('file', file); // file: File object desde input

  try {
    const response = await axios.post(`${API_URL}generate-ui`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.code; // .code contiene el JSON generado
  } catch (error) {
    throw error.response?.data || error.message;
  }
};


export const generateUIFromPrompt = async (prompt) => {
const fullPrompt = `
Genera una estructura de UI Flutter para un editor visual.

✅ Formato JSON esperado:
{
  "pantalla1": [ /* array de widgets */ ],
  "pantalla2": [ /* ... */ ],
  "pantalla3": [],
  "pantalla4": [],
  "pantalla5": []
}

✅ Cada widget debe incluir al menos:
- id: string único
- type: text | button | input | image | container | form | checkbox | appbar | bottomnav | list | card | dropdown | switch | slider | radio | calendar | panel | tabs | drawer
- x, y: posición (números)
- y los atributos necesarios según el tipo (ej: text, color, fontSize, placeholder, navigateTo, etc.)

⚠️ IMPORTANTE:
- Máximo 5 pantallas
- No devuelvas explicaciones, solo el objeto JSON
- No uses comentarios ni texto adicional

🎨 Estilo visual requerido:
- Asegúrate de incluir el atributo "color", "backgroundColor" o "textColor" en todos los widgets visuales.
- Usa colores claros por defecto para evitar fondos negros no intencionales.
- Ejemplos: "#ffffff", "#f3f4f6", "#e5e7eb" para contenedores e inputs. "#000000" para textos.
- No dejes campos de color vacíos o sin definir.
- Asegúrate de que todos los colores generen buen contraste visual.

Texto del usuario: "${prompt}"
`;

  try {
    const response = await axios.post(`${API_URL}generate-ui`, {
      mode: 'prompt',
      data: fullPrompt,
    });
    return response.data.code;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

