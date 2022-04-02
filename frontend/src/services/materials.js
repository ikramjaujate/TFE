import { BASIC_HEADERS } from "../shared/consts/headers";

const GetMaterials = async () => {
  return await (
    fetch(`/api/materials`, {
      method: 'GET',
      headers: BASIC_HEADERS
    }).then(res => {
      return res.json()
    })
  );
}

export {
  GetMaterials
}