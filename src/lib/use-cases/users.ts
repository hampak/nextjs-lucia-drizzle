import { db } from "@/lib/db";
import { userTable } from "@/schema/drizzle-schema";
import { eq } from "drizzle-orm";
import crypto from "crypto"
import { v4 as uuidv4 } from "uuid"

// generate hash password
async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      10000,
      64,
      "sha512",
      (err, derivedKey) => {
        if (err) reject(err)
        resolve(derivedKey.toString("hex"))
      }
    )
  })
}

// register user
export async function registerUserUseCase(username: string, password: string) {

  // check for existing user
  const existingUser = await db.query.userTable.findFirst({
    where: eq(userTable.username, username)
  })

  if (existingUser) {
    // return custom error
  }

  // if there isn't an existing user, create new one
  const salt = crypto.randomBytes(128).toString("base64")
  const hash = await hashPassword(password, salt)
  const [user] = await db
    .insert(userTable)
    .values({
      hashedPassword: hash,
      username,
      salt,
      id: uuidv4(),
    })
    .returning()

  return user
}

// ----------------------------------------------------------------------

// check if password is correct
async function verifyPassword(username: string, plainTextPassword: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, username)
  })

  if (!user) {
    return null
  }

  const salt = user.salt
  const savedPassword = user.hashedPassword

  if (!salt || !savedPassword) {
    return false
  }

  const hash = await hashPassword(plainTextPassword, salt)
  return user.hashedPassword == hash
}

// sign in a user
export async function signInUseCase(username: string, password: string) {
  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, username)
  })

  if (!user) {
    return null
  }

  const isPasswordCorrect = await verifyPassword(username, password)

  if (!isPasswordCorrect) {
    return null
  }

  return user
}