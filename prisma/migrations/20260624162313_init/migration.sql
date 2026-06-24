-- CreateTable
CREATE TABLE "Restaurant"
(
    "id"            INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"          TEXT     NOT NULL,
    "slug"          TEXT     NOT NULL,
    "cuisine"       TEXT     NOT NULL DEFAULT '',
    "description"   TEXT     NOT NULL DEFAULT '',
    "logo"          TEXT     NOT NULL DEFAULT '',
    "heroImage"     TEXT     NOT NULL DEFAULT '',
    "phone"         TEXT     NOT NULL DEFAULT '',
    "email"         TEXT     NOT NULL DEFAULT '',
    "address"       TEXT     NOT NULL DEFAULT '',
    "mapEmbed"      TEXT     NOT NULL DEFAULT '',
    "hours"         TEXT     NOT NULL DEFAULT '{}',
    "theme"         TEXT     NOT NULL DEFAULT 'bistro',
    "colorScheme"   TEXT     NOT NULL DEFAULT 'default',
    "published"     BOOLEAN  NOT NULL DEFAULT false,
    "galleryImages" TEXT     NOT NULL DEFAULT '[]',
    "createdAt"     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MenuSection"
(
    "id"           INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"         TEXT     NOT NULL,
    "description"  TEXT     NOT NULL DEFAULT '',
    "sortOrder"    INTEGER  NOT NULL DEFAULT 0,
    "restaurantId" INTEGER  NOT NULL,
    "createdAt"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"    DATETIME NOT NULL,
    CONSTRAINT "MenuSection_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MenuItem"
(
    "id"            INTEGER  NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name"          TEXT     NOT NULL,
    "description"   TEXT     NOT NULL DEFAULT '',
    "price"         REAL     NOT NULL,
    "image"         TEXT     NOT NULL DEFAULT '',
    "dietaryTags"   TEXT     NOT NULL DEFAULT '[]',
    "sortOrder"     INTEGER  NOT NULL DEFAULT 0,
    "available"     BOOLEAN  NOT NULL DEFAULT true,
    "menuSectionId" INTEGER  NOT NULL,
    "createdAt"     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     DATETIME NOT NULL,
    CONSTRAINT "MenuItem_menuSectionId_fkey" FOREIGN KEY ("menuSectionId") REFERENCES "MenuSection" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_slug_key" ON "Restaurant" ("slug");
