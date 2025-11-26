export interface Board {
    id: string;
    name: string;
    pins: string[]; // Pin IDs
    isPrivate: boolean;
}

export interface Campaign {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    brandName: string;
    brandAvatar: string;
    website: string;
}

export interface Pin {
    id: string;
    title: string;
    image: string;
    description?: string;
    boardId?: string;
    isPrivate?: boolean;
    isSponsored?: boolean;
    campaignInfo?: {
        title: string;
        description: string;
    };
    website?: string;
    user: {
        name: string;
        avatar: string;
        isBusiness?: boolean;
    };
}

export const MOCK_CAMPAIGNS: Campaign[] = [
    {
        id: 'c1',
        title: 'Summer Sale 2025',
        description: 'Get up to 50% off on all summer essentials.',
        coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        brandName: 'Fashion Brand',
        brandAvatar: 'https://i.pravatar.cc/150?u=5',
        website: 'https://fashionbrand.com'
    },
    {
        id: 'c2',
        title: 'Modern Living',
        description: 'Transform your home with our new collection.',
        coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
        brandName: 'Interiors Co.',
        brandAvatar: 'https://i.pravatar.cc/150?u=1',
        website: 'https://interiordesign.co'
    }
];

export const MOCK_BOARDS: Board[] = [
    { id: 'b1', name: 'Home Decor', pins: ['1', '4'], isPrivate: false },
    { id: 'b2', name: 'Travel Plans', pins: ['3', '7'], isPrivate: true },
    { id: 'b3', name: 'Food', pins: ['2'], isPrivate: false },
];

export const MOCK_PINS: Pin[] = [
    {
        id: '1',
        title: 'Modern Interior Design',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
        boardId: 'b1',
        isSponsored: true,
        campaignInfo: {
            title: 'Modern Living',
            description: 'Transform your home with our new collection.'
        },
        website: 'https://interiordesign.co',
        user: { name: 'Interiors Co.', avatar: 'https://i.pravatar.cc/150?u=1', isBusiness: true }
    },
    {
        id: '2',
        title: 'Healthy Breakfast Ideas',
        image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=500&q=80',
        boardId: 'b3',
        user: { name: 'Foodie', avatar: 'https://i.pravatar.cc/150?u=2' }
    },
    {
        id: '3',
        title: 'Travel Photography',
        image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500&q=80',
        boardId: 'b2',
        user: { name: 'Traveler', avatar: 'https://i.pravatar.cc/150?u=3' }
    },
    {
        id: '4',
        title: 'Minimalist Art',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80',
        boardId: 'b1',
        user: { name: 'ArtLover', avatar: 'https://i.pravatar.cc/150?u=4' }
    },
    {
        id: '5',
        title: 'Summer Fashion',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
        isSponsored: true,
        campaignInfo: {
            title: 'Summer Sale 2025',
            description: 'Get up to 50% off on all summer essentials.'
        },
        website: 'https://fashionbrand.com',
        user: { name: 'Fashion Brand', avatar: 'https://i.pravatar.cc/150?u=5', isBusiness: true }
    },
    {
        id: '6',
        title: 'Tech Setup',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
        user: { name: 'Techie', avatar: 'https://i.pravatar.cc/150?u=6' }
    },
    {
        id: '7',
        title: 'Nature Walks',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80',
        boardId: 'b2',
        user: { name: 'Nature', avatar: 'https://i.pravatar.cc/150?u=7' }
    },
    {
        id: '8',
        title: 'Urban Architecture',
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500&q=80',
        user: { name: 'Architect', avatar: 'https://i.pravatar.cc/150?u=8' }
    }
];
export interface Showcase {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    pinIds: string[];
}

export interface User {
    id: string;
    username: string;
    name: string;
    avatar: string;
    bio: string;
    followers: string[]; // User IDs
    following: string[]; // User IDs
    isBusiness?: boolean;
    website?: string;
    showcases?: Showcase[];
}

export const MOCK_USERS: User[] = [
    {
        id: 'me',
        username: 'myprofile',
        name: 'My Profile',
        avatar: 'https://i.pravatar.cc/150?u=me',
        bio: 'Just a creative soul pinning ideas.',
        followers: ['u1', 'u2', 'u3'],
        following: ['u1', 'u4']
    },
    {
        id: 'u1',
        username: 'interiors',
        name: 'Interior Design Co.',
        avatar: 'https://i.pravatar.cc/150?u=1',
        bio: 'Modern minimalist interiors.',
        followers: ['me', 'u2'],
        following: ['me'],
        isBusiness: true,
        website: 'https://interiordesign.co',
        showcases: [
            {
                id: 's1',
                title: 'Summer Collection',
                description: 'Bright and airy designs for the season.',
                coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=500&q=80',
                pinIds: ['1', '4']
            }
        ]
    },
    {
        id: 'u2',
        username: 'foodie',
        name: 'Foodie Life',
        avatar: 'https://i.pravatar.cc/150?u=2',
        bio: 'Eating my way through the world.',
        followers: ['me'],
        following: ['u1', 'u3']
    },
    {
        id: 'u3',
        username: 'traveler',
        name: 'Traveler',
        avatar: 'https://i.pravatar.cc/150?u=3',
        bio: 'Wanderlust.',
        followers: [],
        following: ['me']
    },
    {
        id: 'u4',
        username: 'artlover',
        name: 'ArtLover',
        avatar: 'https://i.pravatar.cc/150?u=4',
        bio: 'Art is life.',
        followers: ['me'],
        following: []
    },
    {
        id: 'u5',
        username: 'fashionbrand',
        name: 'Fashion Brand',
        avatar: 'https://i.pravatar.cc/150?u=5',
        bio: 'Defining style for the modern era.',
        followers: ['u1'],
        following: [],
        isBusiness: true,
        website: 'https://fashionbrand.com',
        showcases: [
            {
                id: 's2',
                title: 'New Arrivals',
                description: 'Check out our latest trends.',
                coverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80',
                pinIds: ['5']
            }
        ]
    },
    {
        id: 'u6',
        username: 'techie',
        name: 'Techie',
        avatar: 'https://i.pravatar.cc/150?u=6',
        bio: 'Tech enthusiast.',
        followers: [],
        following: []
    },
    {
        id: 'u7',
        username: 'nature',
        name: 'Nature',
        avatar: 'https://i.pravatar.cc/150?u=7',
        bio: 'Lover of the outdoors.',
        followers: [],
        following: []
    },
    {
        id: 'u8',
        username: 'architect',
        name: 'Architect',
        avatar: 'https://i.pravatar.cc/150?u=8',
        bio: 'Designing the future.',
        followers: [],
        following: []
    }
];

export interface Invitation {
    id: string;
    type: 'board_collaboration' | 'connection';
    inviterId: string;
    boardId?: string; // Only for board collaboration
    status: 'pending' | 'accepted' | 'declined' | 'ignored';
    timestamp: string;
    message?: string;
}

export const MOCK_INVITATIONS: Invitation[] = [
    {
        id: 'inv1',
        type: 'board_collaboration',
        inviterId: 'u1',
        boardId: 'b1',
        status: 'pending',
        timestamp: '2h',
        message: 'I thought you might like to contribute to this board!'
    },
    {
        id: 'inv2',
        type: 'connection',
        inviterId: 'u2',
        status: 'pending',
        timestamp: '5h',
        message: 'Hey, let\'s connect!'
    },
    {
        id: 'inv3',
        type: 'board_collaboration',
        inviterId: 'u3',
        boardId: 'b3',
        status: 'pending',
        timestamp: '1d'
    }
];
