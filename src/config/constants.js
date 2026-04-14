// File: src/config/constants.js

export const CATEGORIES = [
  { id: 'all', name: 'All', icon: '📰' },
  { id: 'politics', name: 'Politics', icon: '🏛️' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'science', name: 'Science', icon: '🔬' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'world', name: 'World', icon: '🌍' }
];

// ==========================================
// ROLE DEFINITIONS
// ==========================================
export const ROLES = {
  READER: 'reader',
  CREATOR: 'creator',
  JOURNALIST: 'journalist',
  EDITOR: 'editor',
  MODERATOR: 'moderator',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
  ORGANIZATION: 'organization',
  CONTRIBUTOR: 'contributor',
  REVIEWER: 'reviewer'
};

// ==========================================
// DETAILED PERMISSIONS FOR EACH ROLE
// ==========================================
export const ROLE_PERMISSIONS = {
  reader: {
    name: 'Reader',
    description: 'Can only read articles and news',
    badge: '📖',
    color: 'gray',
    level: 0,
    permissions: {
      // Reading
      canRead: true,
      canReadDrafts: false,
      canReadPending: false,
      
      // Writing
      canWrite: false,
      canEdit: false,
      canDelete: false,
      
      // Publishing
      canPublish: false,
      canUnpublish: false,
      canSubmitForReview: false,
      
      // Review & Moderation
      canReview: false,
      canApprove: false,
      canReject: false,
      canModerate: false,
      
      // User Management
      canViewUsers: false,
      canEditUsers: false,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: false,
      
      // Comments
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: false,
      
      // Bookmarks & Interactions
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      // Grievances
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: false,
      
      // Analytics
      canViewAnalytics: false,
      canViewOwnAnalytics: false,
      
      // Settings
      canAccessSettings: false,
      canAccessAdminPanel: false
    }
  },

  contributor: {
    name: 'Contributor',
    description: 'Can write articles but needs approval',
    badge: '✍️',
    color: 'blue',
    level: 1,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: false,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: false,
      canUnpublish: false,
      canSubmitForReview: true,
      
      canReview: false,
      canApprove: false,
      canReject: false,
      canModerate: false,
      
      canViewUsers: false,
      canEditUsers: false,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: false,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: false,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: false,
      
      canViewAnalytics: false,
      canViewOwnAnalytics: true,
      
      canAccessSettings: false,
      canAccessAdminPanel: false
    }
  },

  creator: {
    name: 'Creator',
    description: 'Can write and publish articles directly',
    badge: '✨',
    color: 'green',
    level: 2,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: false,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: true,
      canUnpublish: true,
      canSubmitForReview: true,
      
      canReview: false,
      canApprove: false,
      canReject: false,
      canModerate: false,
      
      canViewUsers: false,
      canEditUsers: false,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: false,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: false,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: false,
      
      canViewAnalytics: false,
      canViewOwnAnalytics: true,
      
      canAccessSettings: false,
      canAccessAdminPanel: false
    }
  },

  journalist: {
    name: 'Journalist',
    description: 'Verified media professional with publishing rights',
    badge: '📰',
    color: 'purple',
    level: 3,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: true,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: true,
      canUnpublish: true,
      canSubmitForReview: true,
      
      canReview: false,
      canApprove: false,
      canReject: false,
      canModerate: false,
      
      canViewUsers: false,
      canEditUsers: false,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: false,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: false,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: false,
      
      canViewAnalytics: true,
      canViewOwnAnalytics: true,
      
      canAccessSettings: false,
      canAccessAdminPanel: false,
      
      hasVerifiedBadge: true
    }
  },

  organization: {
    name: 'Organization',
    description: 'Business or media organization account',
    badge: '🏢',
    color: 'indigo',
    level: 3,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: true,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: true,
      canUnpublish: true,
      canSubmitForReview: true,
      
      canReview: false,
      canApprove: false,
      canReject: false,
      canModerate: false,
      
      canViewUsers: false,
      canEditUsers: false,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: false,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: false,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: false,
      
      canViewAnalytics: true,
      canViewOwnAnalytics: true,
      
      canAccessSettings: false,
      canAccessAdminPanel: false,
      
      hasOrgProfile: true
    }
  },

  reviewer: {
    name: 'Reviewer',
    description: 'Can review and approve/reject articles',
    badge: '🔍',
    color: 'yellow',
    level: 4,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: true,
      
      canWrite: true,
      canEdit: true,
      canDelete: false,
      
      canPublish: true,
      canUnpublish: false,
      canSubmitForReview: true,
      
      canReview: true,
      canApprove: true,
      canReject: true,
      canModerate: false,
      
      canViewUsers: true,
      canEditUsers: false,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: false,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: false,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: true,
      
      canViewAnalytics: true,
      canViewOwnAnalytics: true,
      
      canAccessSettings: false,
      canAccessAdminPanel: true
    }
  },

  moderator: {
    name: 'Moderator',
    description: 'Can moderate content and manage comments',
    badge: '🛡️',
    color: 'orange',
    level: 5,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: true,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: true,
      canUnpublish: true,
      canSubmitForReview: true,
      
      canReview: true,
      canApprove: true,
      canReject: true,
      canModerate: true,
      
      canViewUsers: true,
      canEditUsers: false,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: true,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: true,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: true,
      
      canViewAnalytics: true,
      canViewOwnAnalytics: true,
      
      canAccessSettings: true,
      canAccessAdminPanel: true
    }
  },

  editor: {
    name: 'Editor',
    description: 'Can edit all articles and manage content',
    badge: '📝',
    color: 'teal',
    level: 6,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: true,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: true,
      canUnpublish: true,
      canSubmitForReview: true,
      
      canReview: true,
      canApprove: true,
      canReject: true,
      canModerate: true,
      
      canViewUsers: true,
      canEditUsers: true,
      canDeleteUsers: false,
      canAssignRoles: false,
      canVerifyUsers: true,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: true,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: true,
      
      canViewAnalytics: true,
      canViewOwnAnalytics: true,
      
      canAccessSettings: true,
      canAccessAdminPanel: true
    }
  },

  admin: {
    name: 'Admin',
    description: 'Full access except role assignment',
    badge: '👑',
    color: 'red',
    level: 7,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: true,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: true,
      canUnpublish: true,
      canSubmitForReview: true,
      
      canReview: true,
      canApprove: true,
      canReject: true,
      canModerate: true,
      
      canViewUsers: true,
      canEditUsers: true,
      canDeleteUsers: true,
      canAssignRoles: true,
      canVerifyUsers: true,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: true,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: true,
      
      canViewAnalytics: true,
      canViewOwnAnalytics: true,
      
      canAccessSettings: true,
      canAccessAdminPanel: true
    }
  },

  super_admin: {
    name: 'Super Admin',
    description: 'Complete system access and control',
    badge: '⭐',
    color: 'pink',
    level: 8,
    permissions: {
      canRead: true,
      canReadDrafts: true,
      canReadPending: true,
      
      canWrite: true,
      canEdit: true,
      canDelete: true,
      
      canPublish: true,
      canUnpublish: true,
      canSubmitForReview: true,
      
      canReview: true,
      canApprove: true,
      canReject: true,
      canModerate: true,
      
      canViewUsers: true,
      canEditUsers: true,
      canDeleteUsers: true,
      canAssignRoles: true,
      canVerifyUsers: true,
      canPromoteToSuperAdmin: true,
      
      canComment: true,
      canDeleteOwnComments: true,
      canDeleteAnyComments: true,
      
      canBookmark: true,
      canLike: true,
      canShare: true,
      
      canReportGrievance: true,
      canViewOwnGrievances: true,
      canViewAllGrievances: true,
      
      canViewAnalytics: true,
      canViewOwnAnalytics: true,
      
      canAccessSettings: true,
      canAccessAdminPanel: true,
      canAccessSuperAdminPanel: true
    }
  }
};

export const APP_CONFIG = {
  name: 'Press India',
  tagline: "India's Highest Rated News App",
  description: 'Stay informed with real-time news from across India and user-contributed articles',
  contact: {
    email: 'support@pressindia.com',
    phone: '+91 1234567890'
  }
};

// Helper function to get available roles for assignment
export const getAssignableRoles = (currentUserRole) => {
  const currentLevel = ROLE_PERMISSIONS[currentUserRole]?.level || 0;
  
  // Super admin can assign any role
  if (currentUserRole === ROLES.SUPER_ADMIN) {
    return Object.keys(ROLES);
  }
  
  // Admin can assign roles below their level
  if (currentUserRole === ROLES.ADMIN) {
    return Object.keys(ROLES).filter(role => 
      ROLE_PERMISSIONS[role].level < currentLevel
    );
  }
  
  // Others cannot assign roles
  return [];
};