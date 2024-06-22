import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";
import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Email must be a valid email address" }),
  textMessage: z.string(),
});

export type ContactFields = z.infer<typeof ContactFormSchema>;

type Response = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data: ContactFields = req.body;
    console.log("Received data:", data);

    res.status(200).json({ message: "Contact form submitted successfully!" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Response>
// ) {
//   if (req.method === "POST") {
//     console.log("here");

//     const form = ContactFormSchema.safeParse(req.body);
//     if (!form.success) {
//       res.status(400).json({
//         message: `Invalid body: ${form.error}`,
//       });
//       return;
//     }

//     const formID = process.env.CONTACT_FORM_ID;
//     const portalID = process.env.PORTAL_ID;
//     const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalID}/${formID}`;

//     const hutk = req.cookies && req.cookies["hubspotutk"];
//     const ipAddress = requestIp.getClientIp(req);

//     const payload = {
//       submittedAt: Date.now(),
//       fields: [
//         {
//           objectTypeId: "0-1",
//           name: "full_name",
//           value: form.data.name,
//         },
//         {
//           objectTypeId: "0-1",
//           name: "email",
//           value: form.data.email,
//         },
//         {
//           objectTypeId: "0-1",
//           name: "message",
//           value: form.data.textMessage,
//         },
//       ],
//       context: {
//         ipAddress,
//         hutk,
//         pageName: "Contact Form",
//         pageUri: "www.anlytic.com/contact",
//       },
//     };
//     try {
//       const r = await axios.post(url, payload);
//       res.status(r.status).json({
//         ...r.data,
//       });
//     } catch (error: any) {
//       const err = error?.response?.data || error;
//       /**
//        * will fix this error. unknown error with axios
//        */
//       res.status(500).json(err);
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).json({
//       message: `Method ${req.method} is not allowed.`,
//     });
//   }
// }
