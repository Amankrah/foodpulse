import {defineField, defineType} from 'sanity'

export const recipeDataType = defineType({
  name: 'recipeData',
  title: 'Recipe Data',
  type: 'object',
  fields: [
    // Timing
    defineField({
      name: 'prepTime',
      title: 'Prep Time (minutes)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'cookTime',
      title: 'Cook Time (minutes)',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'restingTime',
      title: 'Resting/Marinating Time (minutes)',
      type: 'number',
    }),

    // Yield
    defineField({
      name: 'servings',
      title: 'Servings',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'yield',
      title: 'Yield',
      type: 'string',
      description: 'e.g., "12 cookies" or "2 loaves"',
    }),

    // Difficulty
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          {title: 'Easy', value: 'easy'},
          {title: 'Medium', value: 'medium'},
          {title: 'Hard', value: 'hard'},
        ],
        layout: 'radio',
      },
      initialValue: 'easy',
    }),

    // Categorization
    defineField({
      name: 'cuisine',
      title: 'Cuisine',
      type: 'string',
      description: 'e.g., Mediterranean, Asian, American',
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'string',
      options: {
        list: [
          'Breakfast',
          'Lunch',
          'Dinner',
          'Appetizer',
          'Side Dish',
          'Dessert',
          'Snack',
          'Beverage',
        ],
      },
    }),
    defineField({
      name: 'diet',
      title: 'Dietary Information',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Vegetarian', value: 'vegetarian'},
          {title: 'Vegan', value: 'vegan'},
          {title: 'Gluten-Free', value: 'gluten-free'},
          {title: 'Dairy-Free', value: 'dairy-free'},
          {title: 'Nut-Free', value: 'nut-free'},
          {title: 'Low-Carb', value: 'low-carb'},
          {title: 'Keto', value: 'keto'},
          {title: 'Paleo', value: 'paleo'},
        ],
      },
    }),

    // Ingredients
    defineField({
      name: 'ingredientGroups',
      title: 'Ingredient Groups',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'groupName',
              title: 'Group Name',
              type: 'string',
              description: 'e.g., "For the dressing" (optional)',
            },
            {
              name: 'ingredients',
              title: 'Ingredients',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'amount', type: 'string', title: 'Amount'},
                    {name: 'unit', type: 'string', title: 'Unit'},
                    {name: 'ingredient', type: 'string', title: 'Ingredient'},
                    {name: 'notes', type: 'string', title: 'Notes'},
                  ],
                  preview: {
                    select: {
                      amount: 'amount',
                      unit: 'unit',
                      ingredient: 'ingredient',
                    },
                    prepare({amount, unit, ingredient}) {
                      return {
                        title: `${amount || ''} ${unit || ''} ${ingredient || ''}`.trim(),
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {groupName: 'groupName', ingredients: 'ingredients'},
            prepare({groupName, ingredients}) {
              const count = ingredients?.length || 0
              return {
                title: groupName || 'Ingredients',
                subtitle: `${count} ingredient${count !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),

    // Instructions
    defineField({
      name: 'instructions',
      title: 'Instructions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            },
            {
              name: 'image',
              title: 'Step Image (optional)',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'tip',
              title: 'Tip (optional)',
              type: 'string',
              description: 'Optional tip for this step',
            },
          ],
          preview: {
            select: {step: 'step'},
            prepare({step}, index) {
              return {
                title: `Step ${(index || 0) + 1}`,
                subtitle: step?.slice(0, 50) + '...',
              }
            },
          },
        },
      ],
    }),

    // Nutrition
    defineField({
      name: 'nutrition',
      title: 'Nutrition (per serving)',
      type: 'object',
      fields: [
        {name: 'calories', type: 'number', title: 'Calories'},
        {name: 'protein', type: 'string', title: 'Protein'},
        {name: 'carbohydrates', type: 'string', title: 'Carbohydrates'},
        {name: 'fat', type: 'string', title: 'Fat'},
        {name: 'fiber', type: 'string', title: 'Fiber'},
        {name: 'sugar', type: 'string', title: 'Sugar'},
        {name: 'sodium', type: 'string', title: 'Sodium'},
      ],
    }),

    // Notes
    defineField({
      name: 'notes',
      title: 'Recipe Notes',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Tips, variations, storage instructions',
    }),
  ],
})
