import { NextRequest, NextResponse } from "next/server";
import { searchSchema } from "@/lib/schemas";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const category = searchParams.get("category");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    // Validate search params
    const validationResult = searchSchema.safeParse({
      query,
      category: category || undefined,
      page,
      limit,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid search parameters",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    // TODO: Implement actual search logic
    // This could use:
    // - Full-text search in your database
    // - Algolia, MeiliSearch, or similar search service
    // - Simple filtering of articles array

    const results = [];
    const total = 0;

    return NextResponse.json({
      success: true,
      data: {
        results,
        total,
        page,
        pageSize: limit,
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("Search error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Search failed. Please try again later.",
      },
      { status: 500 }
    );
  }
}
