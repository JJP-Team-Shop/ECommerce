const { PrismaClient } = require("@prisma/client");
const { getPrismaClient } = require("@prisma/client/runtime/library");
const prisma = new PrismaClient();

async function seed() {
  console.log("Seeding the database.");
  try {
    // Clear the database.
    await prisma.user.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.cartItem.deleteMany({});
    await prisma.product.deleteMany({});

    // model product {
    //     id          Int        @id @default(autoincrement())
    //     productName String
    //     description String
    //     size        String
    //     price       Float
    //     quantity    Int
    //     image       String
    //     cartItem    cartItem[]
    //   }
    const product = await prisma.product.create({
      data: {
        productName: "Jersey",
        description: "J.K. Dobbins",
        size: "Medium",
        price: 55.0,
        quantity: 100,
        image:
          "https://fanatics.frgimages.com/baltimore-ravens/mens-nike-jk-dobbins-purple-baltimore-ravens-game-jersey_pi3911000_altimages_ff_3911851-1adebcf5ecc70e85f950alt1_full.jpg?_hv=2&w=900",
      },
    });
    // model cart {
    //     id          Int        @id @default(autoincrement())
    //     user        user?      @relation(fields: [userId], references: [id], onDelete: Cascade)
    //     userId      Int?       @unique
    //     items       cartItem[]
    //     status      String
    //     totalAmount Float

    //     @@index([userId])
    //   }

    const cart = await prisma.cart.create({
      data: {
        userId: null,
        status: "active",
        
        totalAmount: 0, //add sum function to add total of cart items
      },
    });
    // model cartItem {
    //     id        Int     @id @default(autoincrement())
    //     product   product @relation(fields: [productId], references: [id], onDelete: Cascade)
    //     productId Int
    //     quantity  Int
    //     cart      cart    @relation(fields: [cartId], references: [id], onUpdate: Cascade, onDelete: Cascade)
    //     cartId    Int
    //     user      user?   @relation(fields: [userId], references: [id])
    //     userId    Int?

    //     @@index([productId])
    //     @@index([cartId])
    //   }

    const cartItem = await prisma.cartItem.create({
      data: {
        product: {
          connect: {
            id: product.id,
          },
        },
        quantity: 1,
        cart: {
          connect: {
            id: cart.id,
          },
        },
      },
    });

    //   model user {
    //     id        Int        @id @default(autoincrement())
    //     email     String     @unique
    //     password  String
    //     firstName String
    //     lastName  String
    //     address   String?
    //     cartItem  cartItem[]
    //     cart      cart?
    //     isAdmin   Boolean
    //   }
    // add user

    const user = await prisma.user.create({
      data: {
        email: "bob@gmail.com",
        password: "password",
        firstName: "Bob",
        lastName: "Job",
        address: "123 s street",
        cartItem: {
          connect: {
            id: cartItem.id,
          },
        },
        cart: {
          connect: {
            id: cart.id,
          },
        },
        isAdmin: false,
      },
    });

    console.log("Database is seeded.");
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

if (require.main === module) {
  seed();
}

module.exports = seed;